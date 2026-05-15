import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

export async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const verifyToken = jwt.verify(token, ENV.JWT_SECRET);

    req.user = verifyToken;

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);

    return res.status(401).json({
      message: "Unauthorized user",
    });
  }
}
