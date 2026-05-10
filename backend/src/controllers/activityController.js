import {
  detectSuspiciousActivityService,
  getActivityStatsService,
  logActivityService,
  replayCheckService,
} from "../services/activityService.js";

export async function logActivity(req, res) {
  try {
    const { action, meta } = req.body;
    const userId = req.user.id;

    if (!action) {
      return res.status(400).json({
        success: false,
        message: "Action is required",
      });
    }

    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const result = await logActivityService({
      action,
      meta,
      userId,
      ipAddress,
    });

    return res.status(200).json({
      success: true,
      message: "Activity logged successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in logActivity controller", error);

    return res.status(429).json({
      success: false,
      message: error.message,
    });
  }
}

export async function replayCheck(req, res) {
  try {
    const { action, clientTime } = req.body;
    const userId = req.user.id;

    if (!action || !clientTime) {
      return res.status(400).json({
        success: false,
        message: "Action and client time is required",
      });
    }

    const result = await replayCheckService({
      action,
      clientTime,
      userId,
    });

    return res.status(200).json({
      success: true,
      message: "Replay check",
      data: result,
    });
  } catch (error) {
    console.error("Error in replayCheck controller", error);

    return res.status(400).json({
      success: false,
      message: error.message,
      data: {
        allowed: false,
      },
    });
  }
}

export async function detectSuspiciousActivity(req, res) {
  try {
    const result = await detectSuspiciousActivityService();

    return res.status(200).json({
      success: true,
      message: "Suspicious user detected",
      data: result,
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
    const result = await getActivityStatsService();

    return res.status(200).json({
      success: true,
      message: "Activity stats",
      data: result,
    });
  } catch (error) {
    console.log("Error in getActivityStats controller", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
