// backend/server.js (ESM version)

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import cors from "cors";
import fs from 'fs';

import apiRoutes from './routes/apiRoutes.js';
import courseCardRoutes from './routes/courseCardRoutes.js';
import coursesPageRoutes from './routes/coursesPageRoutes.js';
import liveLessonCardRoutes from './routes/liveLessonCardRoutes.js';
import liveLessonsPageRoutes from './routes/liveLessonsPageRoutes.js';
import productCardRoutes from './routes/productCardRoutes.js';
import productsPageRoutes from './routes/productsPageRoutes.js';
import topicsPageRoutes from './routes/topicsPageRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import lessonsPageRoutes from './routes/lessonsPageRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true // if you ever send cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 🆕 For parsing form data
app.use(cookieParser());

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create upload directories if they don't exist
const uploadDirs = ['uploads', 
                    'uploads/covers', 
                    'uploads/others',
                    'lessons/videos'
                  ];
uploadDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const cardDirs = [
  'course-cards/covers',
  'live-lesson-cards/covers',
  'product-cards/covers'
];
cardDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true }); // recursive creates parent dirs too
  }
});
// Static files (optional if using CSS, images, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // for video uploads
app.use("/course-cards", express.static(path.join(__dirname, "course-cards")));
app.use("/live-lesson-cards", express.static(path.join(__dirname, "live-lesson-cards")));
app.use("/product-cards", express.static(path.join(__dirname, "product-cards")));
app.use("/lessons", express.static(path.join(__dirname, "lessons"))); // ✅ Add this line

app.use('/', apiRoutes); // make sure apiRoutes uses `res.json()`
app.use('/api/course-cards', courseCardRoutes); // course card routes
app.use(coursesPageRoutes); // courses page routes
app.use('/api/live-lesson-cards', liveLessonCardRoutes); // live lesson card routes
app.use(liveLessonsPageRoutes); // live lessons page routes
app.use('/api/product-cards', productCardRoutes); // product card routes
app.use(productsPageRoutes); // products page routes
app.use("/api/topics", lessonRoutes); // lesson routes
app.use("/topics", lessonsPageRoutes); // lessons page routes
app.use("/api/courses", topicsPageRoutes); // topics page routes
app.use("/api/users", profileRoutes); // profile routes


// database connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  }))
  .catch(err => console.error('DB Connection Error:', err));

