import express from "express";
import CourseCard from "../models/CourseCard.js";

const router = express.Router();

router.get('/api/courses', async (req, res) => {
    try {
        // The Model.find() method is how Mongoose talks to the MongoDB database.
        // It specifically queries the 'coursecards' collection because of the model definition.
        const courses = await CourseCard.find() // *** <-- USING THE CORRECT MODEL NAME ***
            .sort({ uploadedAt: -1 }) // Use 'uploadedAt' for sorting, or use the default 'createdAt' if you added 'timestamps: true' to the schema
            .lean(); 

        // Responds with an array of course objects formatted as JSON
        res.json(courses);

    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ 
            message: 'Server error fetching courses',
            error: err.message 
        });
    }
});

// Don't forget to export the router
export default router;