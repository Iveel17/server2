import liveLessonCard from "../models/LiveLessonCard.js";

export const createLiveLessonCard = async (req, res) => {
    try {
        const { id, type, title,  price, description, category, level, duration, lessons, capacity } = req.body;
        const image = req.file ? req.file.filename : null; // Multer puts file info in req.file

        if (!id || !title || !price || !description || !category || !level || !duration || !lessons || !capacity) {
            return res.status(400).json({ error: "Missing required fields" });
        }   
        if (!image) {
            return res.status(400).json({ error: "Image file is required" });
        }
        const newLiveLessonCard = await liveLessonCard.create({
            id,
            type: "live-lesson",
            title,
            image, 
            price,
            description,                
            category,
            level,
            duration,
            lessons,
            capacity,
        }); 
        return res.status(201).json({ 
            message: "Live Lesson card created successfully!", 
            liveLessonCard: newLiveLessonCard 
        });
    } catch (err) {
        console.error("Create Live Lesson Card error:", err);
        res.status(500).json({ error: err.message || "Server error" });
    }
};