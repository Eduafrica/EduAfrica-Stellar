import { Router } from "express";
import StudentRoutes from "./routes/student.routes.js";
import InstructorRoutes from "./routes/instructor.routes.js";
import StellarRoutes from "./routes/stellar.routes.js";
import UploadRoutes from "./routes/upload.routes.js";
import CourseRoutes from "./routes/course.routes.js";
import CategoryRoutes from "./routes/category.routes.js";
import UserRoutes from "./routes/user.routes.js";
import WaitListRoutes from "./routes/waitlist.routes.js";

const router = Router();

router.use("/upload", UploadRoutes);
router.use("/student", StudentRoutes);
router.use("/instructor", InstructorRoutes);
router.use("/stellar", StellarRoutes);
router.use("/course", CourseRoutes);
router.use("/user", UserRoutes);
router.use("/category", CategoryRoutes);
router.use("/waitlist", WaitListRoutes);



export default router;
