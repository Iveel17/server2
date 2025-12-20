import lesson from "../models/Lesson.js";

export const createLesson = async (req, res) => {
    try {
        const { title, description } = req.body;
        const video = req.file ? req.file.filename : null; // Multer puts file info in req.file

        if (!title || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        if (!video) {
            return res.status(400).json({ error: "Video file is required" });
        }
        const newLesson = await lesson.create({
            title,
            description,
            video
        });
        return res.status(201).json({
            message: "Lesson created successfully!",
            lesson: newLesson
        });
    } catch (err) {
        console.error("Create Lesson error:", err);
        res.status(500).json({ error: err.message || "Server error" });
    }
};