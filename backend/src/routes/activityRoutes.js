import express from "express";
import {
  detectSuspiciousActivity,
  logActivity,
  replayCheck,
} from "../controllers/activityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, logActivity);
router.post("/replay-check", authMiddleware, replayCheck);
router.get("/suspicious", authMiddleware, detectSuspiciousActivity);

export default router;
