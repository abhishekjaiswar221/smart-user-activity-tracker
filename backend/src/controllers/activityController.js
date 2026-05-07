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

    const suspiciousUsers = await ActivityLog.aggregate([
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
          totalActions: {
            $sum: 1,
          },
          actions: {
            $push: "$action",
          },
        },
      },
      {
        $match: {
          totalActions: {
            $gt: 20,
          },
        },
      },
      {
        $sort: {
          totalActions: -1,
        },
      },
    ]);

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
