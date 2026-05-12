import ActivityLog from "../models/ActivityLog.js";

export async function logActivityService({ action, meta, userId, ipAddress }) {
  const tenSecondsAgo = new Date(Date.now() - 10000);

  const recentActions = await ActivityLog.countDocuments({
    userId,
    createdAt: { $gte: tenSecondsAgo },
  });

  if (recentActions >= 5) {
    throw new Error("Rate limit exceeded");
  }

  const activity = new ActivityLog({
    userId,
    action,
    meta,
    ipAddress,
  });

  await activity.save();

  return {
    serverTime: new Date().toISOString(),
    actionsInLast10Sec: recentActions + 1,
  };
}

export async function replayCheckService({ action, clientTime, userId }) {
  const timeOfClient = new Date(clientTime);
  const diff = Math.abs(Date.now() - timeOfClient.getTime()) / 1000;

  if (diff > 30) {
    throw new Error("Replay request rejected: request expired");
  }

  const threeSecondsAgo = new Date(Date.now() - 3000);

  const existingAction = await ActivityLog.findOne({
    userId,
    action,
    createdAt: { $gte: threeSecondsAgo },
  });

  if (existingAction) {
    throw new Error("Replay request rejected: duplicate action detected");
  }

  return {
    allowed: true,
    serverTime: new Date().toISOString(),
  };
}

export async function detectSuspiciousActivityService() {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

  const highFrequencyUsers = await ActivityLog.aggregate([
    {
      $match: {
        createdAt: {
          $gte: oneMinuteAgo,
        },
      },
    },
    {
      $group: {
        _id: "$userId",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $match: {
        count: {
          $gt: 20,
        },
      },
    },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        reason: "High frequency",
        count: 1,
      },
    },
  ]);

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const multipleIpUsers = await ActivityLog.aggregate([
    {
      $match: {
        createdAt: {
          $gte: fiveMinutesAgo,
        },
      },
    },
    {
      $group: {
        _id: "$userId",
        uniqueIps: {
          $addToSet: "$ipAddress",
        },
      },
    },
    {
      $project: {
        userId: "$_id",
        ipCount: {
          $size: "$uniqueIps",
        },
      },
    },
    {
      $match: {
        ipCount: {
          $gt: 2,
        },
      },
    },
    {
      $project: {
        _id: 0,
        userId: 1,
        reason: "Multiple IPs",
        count: "$ipCount",
      },
    },
  ]);

  return {
    suspiciousUsers: [...highFrequencyUsers, ...multipleIpUsers],
  };
}

export async function getActivityStatsService() {
  const totalActions = await ActivityLog.countDocuments();

  const mostCommonAction = await ActivityLog.aggregate([
    {
      $group: {
        _id: "$action",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  const actionsPerMinute = await ActivityLog.aggregate([
    {
      $match: {
        createdAt: {
          $gte: tenMinutesAgo,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d %H:%M",
            date: "$createdAt",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const mostActiveUser = await ActivityLog.aggregate([
    {
      $group: {
        _id: "$userId",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  return {
    totalActions,
    mostCommonAction: mostCommonAction[0] || null,
    actionsPerMinute,
    mostActiveUser: mostActiveUser[0] || null,
  };
}
