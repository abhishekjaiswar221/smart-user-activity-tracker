import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import activityRoutes from "./routes/activityRoutes.js";
import authRoutes from "./routes/authRoutes.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());

if (!ENV.CLIENT_URL) {
  throw new Error("CLIENT_URL is not defined in the .env file.");
}

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.get("/api", (_, res) => {
  res.status(200).json({ message: "Success from Backend API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/activity", activityRoutes);

const __dirname = path.resolve();

// Used in production when deployed
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
