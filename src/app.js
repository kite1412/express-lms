import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import initRoute from "./routes/init.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import { authenticate, authorizeRoles } from "./middlewares/auth.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/init", initRoute);
app.use("/auth", authRoute);
app.use("/users", authenticate, authorizeRoles("admin"), userRoute);
app.use("/courses", authenticate, courseRoute);

export default app;
