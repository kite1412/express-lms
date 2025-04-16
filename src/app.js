import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import initRoute from "./routes/init.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import { authenticate, authorizeRoles } from "./middlewares/auth.js";
import assignmentRoute from "./routes/assignment.route.js";
import submissionRoute from "./routes/submission.route.js";
import memberRoute from "./routes/member.route.js";
import gradeRoute from "./routes/grade.route.js";
import attendanceRoute from "./routes/attendance.route.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

//routes
app.use("/init", initRoute);
app.use("/auth", authRoute);
app.use("/users", authenticate, userRoute);
app.use("/courses", authenticate, courseRoute);
app.use("/assignments", authenticate, assignmentRoute);
app.use("/submissions", authenticate, submissionRoute);
app.use("/members", authenticate, memberRoute);
app.use("/grades", authenticate, gradeRoute);
app.use("/attendances", authenticate, attendanceRoute);

export default app;
