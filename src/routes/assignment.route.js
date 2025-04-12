import express from "express";
import {
  createAssignment,
  getAssigmentsByCourseId
} from "../controllers/assignment.controller.js";
import { authorizeRoles } from "../middlewares/auth.js";

const assignmentRoute = express.Router();

assignmentRoute.get("/course/:courseId", getAssigmentsByCourseId);
assignmentRoute.post(
  "/:courseId",
  authorizeRoles("teacher", "admin"),
  createAssignment
);

export default assignmentRoute;