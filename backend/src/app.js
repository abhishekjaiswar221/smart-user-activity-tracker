import cors from "cors";
import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import authRoutes from "./routes/authRoutes.js";

export const app = express();

// Middleware
app.use(express.json());

app.use(cors({ origin: "*", credentials: true }));

app.get("/api", (_, res) => {
  res.status(200).json({ message: "Success from Backend API" });
});

app.use("/api/auth", authRoutes);

const __dirname = path.resolve();

// Used in production when deployed
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
