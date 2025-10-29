import mongoose from "mongoose";

const productCardSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, default: "product" },
  title: { type: String, required: true },
  image: { type: String, required: true}, 
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ["Data Science", "Programming", "Design", "Business", "Marketing", "Development", "Other"]
  },
  stock: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // percentage discount
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("productCard", productCardSchema);