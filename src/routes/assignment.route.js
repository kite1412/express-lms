import express from "express";
import {
  createAssignment,
  deleteAssignment,
  getAssigmentsByCourseId,
  getAssignmentById,
  updateAssignment
} from "../controllers/assignment.controller.js";
import { authorizeRoles } from "../middlewares/auth.js";

const assignmentRoute = express.Router();

assignmentRoute.get("/course/:courseId", getAssigmentsByCourseId);
assignmentRoute.post(
  "/:courseId",
  authorizeRoles("teacher", "admin"),
  createAssignment
);
assignmentRoute.get(
  "/:id", 
  getAssignmentById
);
assignmentRoute.patch(
  "/:id",
  updateAssignment
);
assignmentRoute.delete(
  "/:id",
  deleteAssignment
);

export default assignmentRoute;