import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
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
