import productCard from "../models/ProductCard.js";

export const createProductCard = async (req, res) => {
    try {
        const { id, type, title, price, description, category, stock, discount } = req.body;
        const image = req.file ? req.file.filename : null;

        // Fixed validation - removed discount from required check since it has a default value
        if (!id || !title || !price || !description || !category || stock === undefined || stock === null) {
            return res.status(400).json({ error: "Missing required fields" });
        }   
        if (!image) {
            return res.status(400).json({ error: "Image file is required" });
        }
        
        const newProductCard = await productCard.create({
            id,
            type: "product",
            title,
            image, 
            price: parseFloat(price),
            description,                
            category,
            stock: parseInt(stock),
            discount: discount ? parseFloat(discount) : 0,
        }); 
        
        return res.status(201).json({ 
            message: "Product card created successfully!", 
            productCard: newProductCard 
        });
    } catch (err) {
        console.error("Create Product Card error:", err);
        res.status(500).json({ error: err.message || "Server error" });
    }
};