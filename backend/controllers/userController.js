import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc		Auth User
 * @route		POST /api/users/login
 * @access	public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      designation: user.designation,
      employeeCode: user.employeeCode,
      officeTimings: user.officeTimings,
      leaveCount:user.leaveCount,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // Unauthorized;
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc		Get user profile
 * @route		GET /api/users/profile
 * @access	private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      designation: user.designation,
      employeeCode: user.employeeCode,
      officeTimings: user.officeTimings,
      leaveCount:user.leaveCount,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc		Register new user
 * @route		POST /api/users/
 * @access	public
 */
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    department,
    designation,
    employeeCode,
    officeTimings, leaveCount
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Bad request
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    department,
    designation,
    employeeCode,
    officeTimings,
    leaveCount
  });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      designation: user.designation,
      employeeCode: user.employeeCode,
      officeTimings: user.officeTimings,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc		Update user profile
 * @route		PUT /api/users/profile
 * @access	private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      department: user.department,
      designation: user.designation,
      employeeCode: user.employeeCode,
      officeTimings: user.officeTimings,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc		Get all users
 * @route		GET /api/users
 * @access	private/admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

/**
 * @desc		Delete a user
 * @route		DELETE /api/users/:id
 * @access	private/admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne(user);
    res.json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc		Get user by ID
 * @route		GET /api/users/:id
 * @access	private/admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc		Update a user
 * @route		PUT /api/users/:id
 * @access	private/admin
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
console.log(req.body.leaveCount )
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.department = req.body.department || user.department;
    user.designation = req.body.designation || user.designation;
    user.isAdmin = req.body.isAdmin;
    user.employeeCode = req.body.employeeCode || user.employeeCode;
    user.officeTimings = req.body.officeTimings || user.officeTimings;
    user.leaveCount = req.body.leaveCount || user.leaveCount;
    await user.save();

    res.json({
      message: "SuccessFully Updated User"
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
};
