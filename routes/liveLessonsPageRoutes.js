import express from "express";
import LiveLessonCard from "../models/LiveLessonCard.js";

const router = express.Router();

router.get('/api/live-lessons', async (req, res) => {
    try {
        // The Model.find() method is how Mongoose talks to the MongoDB database.
        // It specifically queries the 'coursecards' collection because of the model definition.
        const liveLessons = await LiveLessonCard.find() // *** <-- USING THE CORRECT MODEL NAME ***
            .sort({ uploadedAt: -1 }) // Use 'uploadedAt' for sorting, or use the default 'createdAt' if you added 'timestamps: true' to the schema
            .lean(); 

        // Responds with an array of course objects formatted as JSON
        res.json(liveLessons);

    } catch (err) {
        console.error("Error fetching liveLessons:", err);
        res.status(500).json({ 
            message: 'Server error fetching liveLessons',
            error: err.message 
        });
    }
});

// Don't forget to export the router
export default router;