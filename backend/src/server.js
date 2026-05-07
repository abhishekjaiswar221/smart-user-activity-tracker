import { app } from "./app.js";
import { connectMongoDB } from "./config/db.js";
import { ENV } from "./lib/env.js";

const startServer = async () => {
  try {
    await connectMongoDB();
    app.listen(ENV.PORT, () =>
      console.log("Server is running on port:", ENV.PORT),
    );
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
