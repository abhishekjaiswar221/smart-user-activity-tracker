import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
      enum: ["login", "logout", "view", "click", "custom"],
    },

    meta: {
      type: Object,
      default: {},
    },

    ipAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
