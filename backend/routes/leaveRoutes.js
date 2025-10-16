import express from "express";
import {
  createLeaveRequest,
  getLeaveRequests,
  updatePendingLeaves,
  getAllLeaveRequests,
} from "../controllers/leaveController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createLeaveRequest)
  .get(protect, getLeaveRequests);

router.route("/allrequest").get(protect,admin, getAllLeaveRequests);
router.route("/:id/status").put(protect, updatePendingLeaves);

export default router;
