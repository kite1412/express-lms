import express from "express";
import { authenticate, authorizeRoles } from "../middlewares/auth.js";
import {
  getCoursemembers,
  deleteMemberFromCourse,
} from "../controllers/member.controller.js";

const memberRoute = express.Router();

memberRoute.get(
  "/:courseId",
  authorizeRoles("admin", "teacher", "student"),
  getCoursemembers
);

memberRoute.delete(
  "/:courseId",
  authorizeRoles("admin", "teacher"),
  deleteMemberFromCourse
);

export default memberRoute;
