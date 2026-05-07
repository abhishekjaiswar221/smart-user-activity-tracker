import express from "express";
import {
  detectSuspiciousActivity,
  getActivityStats,
  logActivity,
  replayCheck,
} from "../controllers/activityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, logActivity);
router.post("/replay-check", authMiddleware, replayCheck);
router.get("/suspicious", authMiddleware, detectSuspiciousActivity);
router.get("/stats", authMiddleware, getActivityStats);

export default router;
