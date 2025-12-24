import multer from "multer";

const uploadProfilePicture = multer({
  storage: multer.memoryStorage(), // store in memory, not disk
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

export default uploadProfilePicture;
