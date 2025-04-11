import express from "express";
import { initUserAdmin } from "../controllers/init.controller.js";

const initRoute = express.Router();

initRoute.post("/", initUserAdmin);

export default initRoute;
