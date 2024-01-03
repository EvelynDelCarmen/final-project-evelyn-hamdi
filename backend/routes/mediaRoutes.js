
import express from "express";
import { UserModel } from "../models/UserModel";
import { authenticateUser } from "../middleware/authenticateUser";
import cloudinary from './cloudinaryConfig'; // Import Cloudinary configuration
import multer from 'multer'; // Import Multer for file handling

const router = express.Router();

// Multer setup (if not already configured)
const upload = multer({ dest: 'uploads/' });

// Cloudinary Upload Route
router.post('/upload', authenticateUser, upload.single('file'), async (req, res) => {
    try {
        let result = await cloudinary.v2.uploader.upload(req.file.path, {
            resource_type: "auto" // auto detects whether it's an image or video
        });

        // Update user model with the URL of the uploaded file
        await UserModel.findByIdAndUpdate(req.user._id, {
            $push: { imagePaths: result.url } // or filmPaths if it's a video
        });

        res.json({ success: true, url: result.url });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

// Cloudinary Media Retrieval Route
router.get('/media', authenticateUser, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);
        res.json({ success: true, imagePaths: user.imagePaths, filmPaths: user.filmPaths });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

export default router;

