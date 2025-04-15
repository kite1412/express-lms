import express from "express";
import {
  getMyGradeByAssignmentId,
  getGradeBySubmissionId,
  getGradesByAssignmentId,
  getGradesByStudentId,
  createGrade,
  updateGrade,
  deleteGrade,
} from "../controllers/grade.controller.js";
import {
  validateCreateGrade,
  validateUpdateGrade,
} from "../middlewares/validators.js";
import { authorizeRoles } from "../middlewares/auth.js";

const gradeRoute = express.Router();

gradeRoute.get(
  "/my/:assignmentId",
  authorizeRoles("admin", "teacher", "student"),
  getMyGradeByAssignmentId
);

gradeRoute.get(
  "/assignment/:assignmentId",
  authorizeRoles("admin", "teacher"),
  getGradesByAssignmentId
);

gradeRoute.get(
  "/student/:studentId",
  authorizeRoles("admin", "teacher"),
  getGradesByStudentId
);

gradeRoute.get(
  "/submission/:submissionId",
  authorizeRoles("admin", "teacher"),
  getGradeBySubmissionId
);

gradeRoute.post(
  "/",
  authorizeRoles("admin", "teacher"),
  validateCreateGrade,
  createGrade
);

gradeRoute.patch(
  "/:gradeId",
  authorizeRoles("admin", "teacher"),
  validateUpdateGrade,
  updateGrade
);

gradeRoute.delete("/:gradeId", authorizeRoles("admin", "teacher"), deleteGrade);

export default gradeRoute;
