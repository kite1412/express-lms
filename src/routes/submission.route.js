import express from "express";
import { authorizeRoles } from "../middlewares/auth.js";
import {
  getAllSubmissionsByAssignment,
  getSubmissionById,
  getMySubmission,
  createSubmission,
  updateSubmission,
  deleteSubmission,
} from "../controllers/submission.controller.js";

const submissionRoute = express.Router();

submissionRoute.get(
  "/",
  authorizeRoles("admin", "teacher"),
  getAllSubmissionsByAssignment
);

submissionRoute.get(
  "/:submissionId",
  authorizeRoles("admin", "teacher"),
  getSubmissionById
);

submissionRoute.get(
  "/my-submission",
  authorizeRoles("admin", "teacher", "student"),
  getMySubmission
);

submissionRoute.post(
  "/",
  authorizeRoles("admin", "teacher", "student"),
  createSubmission
);

submissionRoute.patch(
  "/:submissionId",
  authorizeRoles("admin", "teacher", "student"),
  updateSubmission
);

submissionRoute.delete(
  "/:submissionId",
  authorizeRoles("admin", "teacher", "student"),
  deleteSubmission
);
