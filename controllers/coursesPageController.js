import courseCard from "../models/CourseCard.js";

export const getCoursesPage = async (req, res) => {
    try {
        const courseCards = await courseCard.find().sort({ uploadedAt: -1 });           
        res.json(courseCards);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch courses page data" });
    }       
};