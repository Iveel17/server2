import express from "express";
import { createMulterConfig } from "../utils/multerConfig.js";
import { createLiveLessonCard } from "../controllers/liveLessonCardController.js";

const router = express.Router();

const upload = createMulterConfig("live-lesson-cards/covers");

router.post("/create", upload.single("image"), createLiveLessonCard);

export default router;