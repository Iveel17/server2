import mongoose from "mongoose";

const courseCardSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, default: "course" },
  title: { type: String, required: true },
  image: { type: String, required: true}, 
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ["Data Science", "Programming", "Design", "Business", "Marketing", "Development", "Other"]
  },
  level: { 
    type: String, 
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"]
  },
  duration: { type: Number, required: true }, // in hours
  lessons: { type: Number, required: true },
  capacity: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }, // optional if linked to auth
});

export default mongoose.model("courseCard", courseCardSchema);