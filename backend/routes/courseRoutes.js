import express from "express";
import {
  getAllCourses,
  enrollCourse,
  unenrollCourse,
  getMyCourses,
} from "../controllers/courseController.js";
import protect from "../middleware/authMiddleware.js";
import { seedCourses } from "../controllers/seedController.js"; // ✅ new import

const router = express.Router();

// Public
router.get("/", getAllCourses);

// ✅ Public route to seed demo data (for first-time setup)
router.get("/seed", seedCourses);

// Protected
router.get("/my", protect, getMyCourses);
router.post("/:id/enroll", protect, enrollCourse);
router.post("/:id/unenroll", protect, unenrollCourse);

export default router;
