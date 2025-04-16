import express from "express";
import {
  validateCreateMaterial,
  validateUpdateMaterial,
} from "../middlewares/validators.js";
import { authorizeRoles } from "../middlewares/auth.js";
import {
  getMaterialById,
  getAllMaterialsByCourseId,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../controllers/materials.controller.js";

const materialRoute = express.Router();

materialRoute.get("/course/:courseId", getAllMaterialsByCourseId);

materialRoute.get("/:materialId", getMaterialById);

materialRoute.post("/", authorizeRoles("admin", "teacher"), createMaterial);

materialRoute.patch(
  "/:materialId",
  authorizeRoles("admin", "teacher"),
  updateMaterial
);

materialRoute.delete(
  "/:materialId",
  authorizeRoles("admin", "teacher"),
  deleteMaterial
);

export default materialRoute;
