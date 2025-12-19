import topic from "../models/Topic.js";

export const createTopic = async (req, res) => {
    try {
        const { title, lessonCount } = req.body;

        if (!title || !lessonCount) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newTopic = await topic.create({
            title,
            lessonCount
        });
        return res.status(201).json({
            message: "Topic created successfully!",
            topic: newTopic
        });
    } catch (err) {
        console.error("Create Topic error:", err);
        res.status(500).json({ error: err.message || "Server error" });
    }
};