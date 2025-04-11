import express from "express";
import { getAssigmentsByCourseId } from "../controllers/assignment.controller.js";

const assignmentRoute = express.Router();

assignmentRoute.get("/course/:courseId", getAssigmentsByCourseId);

export default assignmentRoute;