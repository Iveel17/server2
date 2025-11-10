import express from "express";
import { createMulterConfig } from "../utils/multerConfig.js";
import { createCourseCard } from "../controllers/courseCardController.js";

const router = express.Router();

// ✅ Multer setup - just one line!
const upload = createMulterConfig("course-cards/covers");

// ✅ Routes
router.post("/create", upload.single("image"), createCourseCard);

export default router;