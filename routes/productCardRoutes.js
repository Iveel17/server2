import express from "express";
import { createMulterConfig } from "../utils/multerConfig.js";
import { createProductCard } from "../controllers/productCardController.js";

const router = express.Router();

const upload = createMulterConfig("product-cards/covers");

router.post("/create", upload.single("image"), createProductCard);

export default router;