
import express from "express";
import { UserModel } from "../models/UserModel";
import { ImageModel } from "../models/ImageModel";
import { authenticateUser } from "../middleware/authenticateUser";
import cloudinary from '../config/cloudinaryConfig'; // Import Cloudinary configuration
import multer from 'multer'; // Import Multer for file handling

const router = express.Router();

// Multer setup (if not already configured)
const upload = multer({ dest: 'uploads/' });

// Cloudinary Upload Route
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        let result = await cloudinary.v2.uploader.upload(req.file.path, {
            resource_type: "auto" // auto detects whether it's an image or video
        });

        // Update user model with the URL of the uploaded file
        const image = await new Image({ name: req.body.name, imagePaths: req.file.path }).save()

        res.json({ success: true, url: imagePaths });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

// Cloudinary Media Retrieval Route
router.get('/media', async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);
        res.json({ success: true, imagePaths: user.imagePaths, filmPaths: user.filmPaths });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

export default router;

