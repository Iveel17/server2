import mongoose from "mongoose";

const LiveLessonCardSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, default: "live-lesson" },
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
  rating: { type: Number, default: 0 },
  duration: { type: Number, required: true }, // in hours
  capacity: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }, // optional if linked to auth
});

export default mongoose.model("liveLessonCard", LiveLessonCardSchema);