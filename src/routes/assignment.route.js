import express from "express";
import { 
  createAssignment, 
  getAssigmentsByCourseId 
} from "../controllers/assignment.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.js";

const assignmentRoute = express.Router();

assignmentRoute.get("/course/:courseId", getAssigmentsByCourseId);
assignmentRoute.post(
  "/:courseId",
  authenticate,
  authorizeRoles("teacher", "admin"),
  createAssignment
);

export default assignmentRoute;