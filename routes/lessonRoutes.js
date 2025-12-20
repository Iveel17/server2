import express from "express";
import mongoose from "mongoose";
import path from "path";
import { createMulterConfig } from "../utils/multerConfig.js";
import Lesson from "../models/Lesson.js";

const router = express.Router();

// ✅ Multer setup
const upload = createMulterConfig("lessons/videos");

router.get("/test", (req, res) => {
  res.send("LESSON ROUTES WORK");
});

// ✅ Corrected Route
router.post("/:topicId/lessons", upload.single("video"), async (req, res) => {
  try {
    const { topicId } = req.params;
    const { title, description } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Check if video was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Video file is required" });
    }

    // Validate topicId format
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ error: "Invalid topic ID" });
    }

    // ✅ Store only the relative path (not full system path)
    const videoPath = `lessons/videos/${req.file.filename}`;

    // Create the lesson
    const newLesson = await Lesson.create({
      topicId: topicId,
      title,
      description: description || "",
      video: videoPath, // ✅ Store relative path
      uploadedAt: new Date()
    });

    res.status(201).json(newLesson);

  } catch (err) {
    console.error("Create Lesson error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;