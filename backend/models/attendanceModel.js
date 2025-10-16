import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    loginTime: { type: Date, required: true },
    logoutTime: { type: Date },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
