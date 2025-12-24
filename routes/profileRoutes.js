import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import uploadProfilePicture from "../middleware/uploadProfilePicture.js";
import {
  uploadProfilePictureToCloudinary,
  deleteProfilePictureFromCloudinary,
} from "../utils/cloudinary.js";
import User from "../models/User.js";

const router = express.Router();
router.put(
  "/me/profile-picture",
  requireAuth(),
  uploadProfilePicture.single("profilePicture"), // 🔥 MUST MATCH
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.profilePicture?.publicId) {
        await deleteProfilePictureFromCloudinary(
          user.profilePicture.publicId
        );
      }

      const uploaded = await uploadProfilePictureToCloudinary(
        req.file.buffer
      );

      user.profilePicture = {
        url: uploaded.url,
        publicId: uploaded.publicId,
      };

      await user.save();

      const safeUser = user.toObject();
      delete safeUser.password;

      res.json(safeUser);
    } catch (err) {
      console.error("Profile picture upload error:", err);
      res.status(500).json({ message: "Profile picture update failed" });
    }
  }
);

router.put(
  "/me",
  requireAuth(),
  async (req, res) => {
    try {
      const { firstName, lastName } = req.body;

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { firstName, lastName },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const safeUser = user.toObject();
      delete safeUser.password;

      res.json(safeUser);
    } catch (err) {
      console.error("Profile update error:", err);
      res.status(500).json({ message: "Failed to update profile" });
    }
  }
);

export default router;
