import express from "express";
import { logActivity, replayCheck } from "../controllers/activityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, logActivity);
router.post("/replay-check", authMiddleware, replayCheck);

export default router;
