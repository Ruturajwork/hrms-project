import express from "express";
import {
  markLogin,
  markLogout,
  getTodaysAttendance,
  getAllAttendance,
  getAllUsersAttendance,
} from "../controllers/attendanceController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/checkin").post(protect, markLogin);
router.route("/checkout").put(protect, markLogout);
router.route("/today").get(protect, getTodaysAttendance);

router.route("/allattendance").get(protect, getAllAttendance);
router.route("/all").get(protect, admin, getAllUsersAttendance);

export default router;
