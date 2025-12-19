import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseCard",          // must match Course model name
        required: true
    },
    title: { type: String, required: true },
    lessonCount: { type: Number, required: true, min: 0},
    uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("topic", topicSchema);