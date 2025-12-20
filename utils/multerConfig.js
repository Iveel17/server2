import multer from "multer";
import path from "path";

export const createMulterConfig = (destinationFolder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), destinationFolder));
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // ".mp4"
      cb(null, `${Date.now()}${ext}`);
    },
  });

  const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  // 🎥 VIDEO UPLOADS
  if (destinationFolder.includes("videos") || destinationFolder.includes("lessons")) {
    const allowedVideoExts = [".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv", ".webm"];

    const isVideoExt = allowedVideoExts.includes(ext);
    const isVideoMime = file.mimetype.startsWith("video/");

    if (isVideoExt && isVideoMime) {
      return cb(null, true);
    }

    return cb(
      new Error("Only video files are allowed (mp4, avi, mov, wmv, flv, mkv, webm).")
    );
  }

  // 🖼 IMAGE UPLOADS (UNCHANGED)
  const allowedImageExts = [".jpg", ".jpeg", ".png", ".gif"];
  const isImageExt = allowedImageExts.includes(ext);
  const isImageMime = file.mimetype.startsWith("image/");

  if (isImageExt && isImageMime) {
    return cb(null, true);
  }

  return cb(
    new Error("Only image files are allowed (jpg, jpeg, png, gif).")
  );
};

  return multer({ 
    storage, 
    fileFilter,
    limits: { 
      fileSize: destinationFolder.includes("videos") || destinationFolder.includes("lessons")
        ? 500 * 1024 * 1024  // 500MB for videos
        : 5 * 1024 * 1024     // 5MB for images
    }
  });
};