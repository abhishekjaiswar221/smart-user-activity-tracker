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
