import express from "express";
import { logActivity } from "../controllers/activityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, logActivity);

export default router;
