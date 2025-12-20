// routes/lessonsPageRoutes.js
import express from "express";
import Lesson from "../models/Lesson.js";

const router = express.Router();

router.get("/:topicId/lessons", async (req, res) => {
  try {
    const { topicId } = req.params;
    
    console.log("Fetching lessons for topicId:", topicId); // Debug log

    const lessons = await Lesson.find({ topicId: topicId }) // Changed from topic to topicId
      .sort({ uploadedAt: 1 })
      .lean();

    console.log("Found lessons:", lessons); // Debug log

    res.json(lessons);
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;