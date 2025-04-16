import express from "express";
import {
  createAttendance,
  deleteAttendance,
  fillAttendance,
  getAttendanceById,
  getAttendancesByCourseId,
  getAttendanceRecords,
} from "../controllers/attendance.controller.js";
import { authorizeRoles } from "../middlewares/auth.js";

const attendanceRoute = express.Router();

attendanceRoute.get("/:id", getAttendanceById);
attendanceRoute.get("/course/:courseId", getAttendancesByCourseId);
attendanceRoute.get(
  "/records/:attendanceId",
  authorizeRoles("admin", "teacher"),
  getAttendanceRecords
);
attendanceRoute.post("/", authorizeRoles("teacher", "admin"), createAttendance);
attendanceRoute.post("/:id", fillAttendance);
attendanceRoute.delete(
  "/:id",
  authorizeRoles("teacher", "admin"),
  deleteAttendance
);

export default attendanceRoute;
