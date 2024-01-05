
import express from "express";
import { UserModel } from "../models/UserModel";
import { ImageModel } from "../models/ImageModel";
import { authenticateUser } from "../middleware/authenticateUser";
import cloudinary from '../config/cloudinaryConfig'; // Import Cloudinary configuration
import multer from 'multer'; // Import Multer for file handling
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        allowedFormats: ['jpg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
})
// Multer setup (if not already configured)
const upload = multer({ storage });

// Cloudinary Upload Route
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // let result = await cloudinary.v2.uploader.upload(req.file.path, {
        //     resource_type: "auto" // auto detects whether it's an image or video
        // });

        // Update user model with the URL of the uploaded file
        const image = await new ImageModel({ name: req.body.name, imagePaths: req.file.path }).save()

        res.json({ success: true, image });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

// Cloudinary Media Retrieval Route
router.get('/media', async (req, res) => {
    try {
        const images = await ImageModel.find();
        res.json({ success: true, images });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

export default router;

