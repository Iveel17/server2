import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",          // must match Topic model name
    required: true
  },
  title: { type: String, required: true },
  video: { type: String, required: true}, 
  description: { type: String, default: "" },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lesson", lessonSchema);