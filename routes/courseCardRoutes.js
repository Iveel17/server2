import express from "express";
import multer from "multer";
import path from "path";
import { createCourseCard } from "../controllers/courseCardController.js";

const router = express.Router();

// ✅ Storage config for course card images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use absolute path to avoid "file not found" issues
    cb(null, path.join(process.cwd(), "course-cards/covers"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

// ✅ File filter (only allow images)
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const extname = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowed.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpg, jpeg, png, gif)."));
  }
};

// ✅ Multer setup
const upload = multer({ storage, fileFilter });

// ✅ Routes
router.post("/create", upload.single("image"), createCourseCard); // POST /api/course-cards/create

export default router;
