import express from "express";
import ProductCard from "../models/ProductCard.js";

const router = express.Router();

router.get('/api/products', async (req, res) => {
    try {
        // The Model.find() method is how Mongoose talks to the MongoDB database.
        // It specifically queries the 'productcards' collection because of the model definition.
        const products = await ProductCard.find() // *** <-- USING THE CORRECT MODEL NAME ***
            .sort({ uploadedAt: -1 }) // Use 'uploadedAt' for sorting, or use the default 'createdAt' if you added 'timestamps: true' to the schema
            .lean(); 

        // Responds with an array of product objects formatted as JSON
        res.json(products);

    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ 
            message: 'Server error fetching products',
            error: err.message 
        });
    }
});

// Don't forget to export the router
export default router;