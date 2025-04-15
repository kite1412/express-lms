import express from "express";
import { authenticate, authorizeRoles } from "../middlewares/auth.js";
import {
  getCourseMembers,
  deleteMemberFromCourse,
} from "../controllers/member.controller.js";

const memberRoute = express.Router();

memberRoute.get(
  "/:courseId",
  authorizeRoles("admin", "teacher", "student"),
  getCourseMembers
);

memberRoute.delete(
  "/:courseId",
  authorizeRoles("admin", "teacher"),
  deleteMemberFromCourse
);

export default memberRoute;
