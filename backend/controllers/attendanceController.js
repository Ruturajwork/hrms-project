import asyncHandler from "express-async-handler";
import Attendance from "../models/attendanceModel.js";
import User from "../models/userModel.js";
import moment from "moment";
// Mark attendance (login)

export const markLogin = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Ensure officeTimings exists and is correctly formatted
  if (!user.officeTimings) {
    res.status(400);
    throw new Error("Office timings not set for the user");
  }

  const [startHours, startMinutes] = user.officeTimings.split(":");
  if (!startHours || !startMinutes) {
    res.status(400);
    throw new Error("Invalid office timings format");
  }

  // Convert officeTimings to a moment object
  const officeStartTime = moment()
    .hour(startHours)
    .minute(startMinutes)
    .second(0)
    .millisecond(0);

  // Check if the user has already logged in today
  const todayStart = moment().startOf("day");
  const todayEnd = moment().endOf("day");

  const existingRecord = await Attendance.findOne({
    userId,
    loginTime: { $gte: todayStart, $lt: todayEnd },
  });

  if (existingRecord) {
    res.status(400);
    throw new Error("User has already checked in today.");
  }

  // Determine if the login is late
  let status = "On Time";
  if (moment() > officeStartTime) {
    status = "Late";
  }

  const attendance = new Attendance({
    userId,
    loginTime: moment(), // Get the current time using moment
    status,
  });

  const createdAttendance = await attendance.save();
  res.status(201).json(createdAttendance);
});

// Mark attendance (logout)
export const markLogout = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the user ID from req.user._id
  const logoutTime = new Date(); // Get the current time as logout time

  const attendance = await Attendance.findOne({
    userId,
    logoutTime: { $exists: false },
  });

  if (!attendance) {
    res.status(404);
    throw new Error("Attendance record not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const loginTime = new Date(attendance.loginTime);
  const hoursWorked = (logoutTime - loginTime) / (1000 * 60 * 60);

  let status;
  if (hoursWorked < 5) {
    status = "Absent";
  } else if (hoursWorked >= 5 && hoursWorked < 9) {
    status = "Half-day";
  } else if (hoursWorked >= 9 && hoursWorked <= 10) {
    status = "Present";
  } else if (hoursWorked > 10) {
    status = "Over-time";
  }

  attendance.logoutTime = logoutTime;
  attendance.status = status;

  const updatedAttendance = await attendance.save();
  res.json(updatedAttendance);
});

// @desc    Fetch today's attendance for a user
// @route   GET /api/attendance/today
// @access  Private
export const getTodaysAttendance = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find a single attendance record for the current user for today's date
  const attendance = await Attendance.findOne({
    userId,
    loginTime: { $gte: today },
  });

  console.log(attendance);

  // Send the attendance record as an object, or an empty object if no record is found
  res.json(attendance || {});
});

export const getAllAttendance = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find all attendance records for the current user
  const allAttendance = await Attendance.find({ userId });

  // Send the array of attendance records
  res.json(allAttendance);
});


export const getAllUsersAttendance = asyncHandler(async (req, res) => {


  // Find all attendance records for the current user
  const allAttendance = await Attendance.find({ });

  // Send the array of attendance records
  res.json(allAttendance);
});
