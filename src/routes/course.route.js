import express from "express";
import {
  validateCreateCourse,
  validateUpdateCourse,
  validateJoinCourse,
} from "../middlewares/validators.js";
import {
  getAllCourses,
  getCoursebyId,
  createCourse,
  updateCourse,
  deleteCourse,
  joinCourse,
  getMyCourses,
} from "../controllers/course.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.js";

const courseRoute = express.Router();

courseRoute.get("/", authenticate, authorizeRoles("admin"), getAllCourses);

courseRoute.post(
  "/",
  authorizeRoles("admin", "teacher"),
  validateCreateCourse,
  createCourse
);

courseRoute.patch(
  "/:id",
  authorizeRoles("admin", "teacher"),
  validateUpdateCourse,
  updateCourse
);

courseRoute.delete("/:id", authorizeRoles("admin", "teacher"), deleteCourse);

courseRoute.post(
  "/join/:code",
  authorizeRoles("admin", "teacher", "student"),
  validateJoinCourse,
  joinCourse
);

courseRoute.get(
  "/my-courses",
  authorizeRoles("admin", "teacher", "student"),
  getMyCourses
);

courseRoute.get("/:id", authenticate, authorizeRoles("admin"), getCoursebyId);

export default courseRoute;
