import express from "express";
import Topic from "../models/Topic.js";

const router = express.Router();

/**
 * GET topics for a specific course
 * /api/courses/:courseId/topics
 */
router.get("/:courseId/topics", async (req, res) => {
  try {
    const { courseId } = req.params;

    const topics = await Topic.find({ courseId })
      .sort({ number: 1 });

    res.json(topics);

  } catch (err) {
    console.error("Error fetching topics:", err);
    res.status(500).json({
      message: "Server error fetching topics",
      error: err.message
    });
  }
});

router.post("/:courseId/topics", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, lessonCount } = req.body;

    if (!title || lessonCount === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTopic = await Topic.create({
      title,
      lessonCount,
      courseId
    });

    res.status(201).json(newTopic);

  } catch (err) {
    console.error("Create topic error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router; // ✅ THIS WAS MISSING
