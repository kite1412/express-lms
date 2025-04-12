import express from "express";
import {
  createAssignment,
  getAssigmentsByCourseId,
  getAssignmentById
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
)

export default assignmentRoute;