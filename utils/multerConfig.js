import multer from "multer";
import path from "path";

export const createMulterConfig = (destinationFolder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), destinationFolder));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + path.extname(file.originalname));
    },
  });

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

  return multer({ storage, fileFilter });
};