import ActivityLog from "../models/ActivityLog.js";

export async function logActivity(req, res) {
  try {
    const { action, meta } = req.body;
    const userId = req.user.id;

    if (!action) {
      return res.status(400).json({
        message: "Action is required",
      });
    }

    const tenSecondsAgo = new Date(Date.now() - 10000);

    const recentActions = await ActivityLog.countDocuments({
      userId: req.user.id,
      createdAt: { $gte: tenSecondsAgo },
    });

    if (recentActions >= 5) {
      return res.status(429).json({
        message: "Rate limit exceeded",
      });
    }

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const activity = new ActivityLog({
      userId,
      action,
      meta,
      ipAddress: ip,
    });
    await activity.save();

    return res.status(200).json({
      success: true,
      serverTime: new Date().toISOString(),
      actionsInLast10Sec: recentActions + 1,
    });
  } catch (error) {
    console.error("Error in logActivity controller", error);
    return res.status(500).json({
      message: "Internal Server Error hai",
    });
  }
}

export async function replayCheck(req, res) {
  try {
    const { action } = req.body;

    const clientTime = new Date(req.body.clientTime);
    const diff = Math.abs(Date.now() - clientTime.getTime()) / 1000;

    if (diff > 30) {
      return res.status(400).json({
        allowed: false,
        message: "Client time difference too large",
      });
    }

    const threeSecondsAgo = new Date(Date.now() - 3000);

    const existingAction = await ActivityLog.findOne({
      userId: req.user.id,
      action,
      createdAt: { $gte: threeSecondsAgo },
    });

    if (existingAction) {
      return res.status(400).json({
        allowed: false,
        message: "Duplicate action detected",
      });
    }

    return res.status(200).json({
      allowed: true,
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in replayCheck controller", error);
    return res.status(500).json({
      message: "Internal Server Error hai",
    });
  }
}

export async function detectSuspiciousActivity(req, res) {
  try {
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

    const suspiciousUsers = [...highFrequencyUsers, ...multipleIpUsers];

    return res.status(200).json({
      success: true,
      suspiciousUsers,
    });
  } catch (error) {
    console.log("Error in detectSuspiciousActivity controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getActivityStats(req, res) {
  try {
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

    return res.status(200).json({
      success: true,
      data: {
        totalActions,
        mostCommonAction: mostCommonAction[0] || null,
        actionsPerMinute,
        mostActiveUser: mostActiveUser[0] || null,
      },
    });
  } catch (error) {
    console.log("Error in getActivityStats controller", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
