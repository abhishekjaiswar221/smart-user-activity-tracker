import mongoose from "mongoose";
import { ENV } from "../lib/env.js";

export const connectMongoDB = async () => {
  try {
    if (!ENV.MONGODB_URI) {
      throw new Error(
        "MongoDB URI in not defined in the environment variables",
      );
    }

    const connect = await mongoose.connect(ENV.MONGODB_URI);
    console.log("Connected to MongoDB Successfully:", connect.connection.host);
  } catch (error) {
    console.error("Error connecting MongoDB:", error);
    process.exit(1);
  }
};
