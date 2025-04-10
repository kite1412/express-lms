import express from "express";
import { validateLoginUser } from "../middlewares/validators.js";
import { loginUser, logoutUser } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/login", validateLoginUser, loginUser);
authRoute.post("/logout", validateLoginUser, logoutUser);

export default authRoute;
