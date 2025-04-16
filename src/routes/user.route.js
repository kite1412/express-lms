import express from "express";
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  getMyInfo,
} from "../controllers/user.controller.js";
import { authorizeRoles } from "../middlewares/auth.js";

const userRoute = express.Router();

userRoute.get("/me", getMyInfo);

userRoute.use(authorizeRoles("admin"))
userRoute.get("/", getAllUser);
userRoute.get("/:id", getUserById);
userRoute.post("/", createUser);
userRoute.patch("/:id", updateUser);
userRoute.delete("/:id", deleteUser);
userRoute.patch("/update-password/:id", updateUserPassword);

export default userRoute;
