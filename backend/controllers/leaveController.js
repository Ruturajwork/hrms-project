import asyncHandler from "express-async-handler";
import LeaveRequest from "../models/leaveModel.js";
import User from "../models/userModel.js";

// @desc    Create a new leave request
// @route   POST /api/leaves
// @access  Private
const createLeaveRequest = asyncHandler(async (req, res) => {
  const { startDate, endDate, leaveType, reason } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const leaveRequest = new LeaveRequest({
    user: req.user._id,
    startDate,
    endDate,
    leaveType,
    reason,
    pendingLeaves: user.leaveCount,
  });

  const createdLeaveRequest = await leaveRequest.save();
  res.status(201).json(createdLeaveRequest);
});

// @desc    Get all leave requests for the logged-in user
// @route   GET /api/leaves
// @access  Private
const getLeaveRequests = asyncHandler(async (req, res) => {
  const leaveRequests = await LeaveRequest.find({ user: req.user._id });
  res.json(leaveRequests);
});

const getAllLeaveRequests = asyncHandler(async (req, res) => {
  const leaveRequests = await LeaveRequest.find({}).populate(
    "user",
    "email name"
  );
  res.json(leaveRequests);
});

// @desc    Update a leave request's pendingLeaves field
// @route   PUT /api/leaves/:id/pending
// @access  Private

const updatePendingLeaves = asyncHandler(async (req, res) => {
  const { pendingLeaves } = req.body;
  const leaveRequest = await LeaveRequest.findById(req.params.id).populate(
    "user"
  );

  if (!leaveRequest) {
    res.status(404);
    throw new Error("Leave request not found");
  }

  const user = await User.findById(leaveRequest.user._id);
  // console.log("before",user.leaveCount)
  if (pendingLeaves === "Approved") {
    const startDate = new Date(leaveRequest.startDate);
    const endDate = new Date(leaveRequest.endDate);
    // Calculating the time difference
    const differenceInTime = endDate.getTime() - startDate.getTime();

    // Calculating the no. of days between two dates, including both start and end dates
    const differenceInDays =
      Math.round(differenceInTime / (1000 * 3600 * 24)) + 1;
    console.log(differenceInDays);
    // Assuming user.leaveCount is a string, convert it to a number
    const leaveCount = parseInt(user.leaveCount);
    console.log("actualCount",leaveCount)
    console.log(leaveCount - differenceInDays);
    // Subtract the difference from leaveCount and update leaveRequest.pendingLeaves
    leaveRequest.pendingLeaves = (leaveCount - differenceInDays).toString();

    if (leaveCount >= differenceInDays) {
      user.leaveCount = leaveCount - differenceInDays
     const updatedUser= await user.save();
     console.log("updatedUSer",updatedUser.leaveCount)
    } else {
      res.status(400);
      throw new Error("Insufficient leave balance");
    }
  }

  leaveRequest.status = pendingLeaves || leaveRequest.status;
  await leaveRequest.save();

  res.json({ message: "Leave Request Updated" });
});

export {
  createLeaveRequest,
  getLeaveRequests,
  updatePendingLeaves,
  getAllLeaveRequests,
};
