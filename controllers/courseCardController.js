import courseCard from "../models/CourseCard.js";

export const createCourseCard = async (req, res) => {
    try {
        const { id, type, title,  price, description, category, level, duration, lessons, capacity } = req.body;
        const image = req.file ? req.file.filename : null; // Multer puts file info in req.file

        if (!id || !title || !price || !description || !category || !level || !duration || !lessons || !capacity) {
            return res.status(400).json({ error: "Missing required fields" });
        }   
        if (!image) {
            return res.status(400).json({ error: "Image file is required" });
        }
        const newCourseCard = await courseCard.create({
            id,
            type: "course",
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
            message: "Course card created successfully!", 
            courseCard: newCourseCard 
        });
    } catch (err) {
        console.error("Create Course Card error:", err);
        res.status(500).json({ error: err.message || "Server error" });
    }
};