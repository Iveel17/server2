import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import { requireAuth } from "../middleware/authMiddleware.js"; // Your auth middleware

const router = express.Router();

// All cart routes require authentication
router.post("/add", requireAuth, addToCart);
router.delete("/remove/:itemId", requireAuth, removeFromCart);
router.get("/", requireAuth, getCart);

export default router;