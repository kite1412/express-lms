import express from "express";
import {
  createAssignment,
  deleteAssignment,
  getAssigmentsByCourseId,
  getAssignmentById,
  updateAssignment,
  getMyAssignments,
} from "../controllers/assignment.controller.js";
import { authorizeRoles } from "../middlewares/auth.js";

const assignmentRoute = express.Router();

assignmentRoute.get("/course/:courseId", getAssigmentsByCourseId);
assignmentRoute.get(
  "/my",
  authorizeRoles("admin", "teacher", "student"),
  getMyAssignments
);
assignmentRoute.post(
  "/:courseId",
  authorizeRoles("teacher", "admin"),
  createAssignment
);
assignmentRoute.get("/:id", getAssignmentById);
assignmentRoute.patch("/:id", updateAssignment);
assignmentRoute.delete("/:id", deleteAssignment);

export default assignmentRoute;
