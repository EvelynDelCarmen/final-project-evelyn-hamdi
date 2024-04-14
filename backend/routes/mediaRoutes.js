
import express from "express";
import { PortfolioItemModel } from "../models/PortfolioItemModel";
import { authenticateUser } from "../middleware/authenticateUser";
import cloudinary from '../config/cloudinaryConfig';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
        console.log(req.body)
        return {
            folder: req.body.folderName || 'defaultFolder', // Use folder name from the request, or a default
            allowedFormats: ['jpg', 'png'],
            transformation: [{ width: 500, height: 500, crop: 'limit' }],
        };
    },
});
// Multer setup (if not already configured)
const upload = multer({ storage });

router.post('/upload', authenticateUser, upload.single('image'), async (req, res) => {
    try {
        const { folderName, name, itemType } = req.body;
        // Here, `req.user` is assumed to be set by `authenticateUser` middleware
        // and contains the user's information, including their ID.

        // Create a new PortfolioItem with the uploaded image information
        const newPortfolioItem = new PortfolioItemModel({
            user: req.user._id, // Link the item to the user
            folderName,
            name: [name], // Assuming name is provided; adjust as necessary
            paths: [req.file.path], // The path(s) of the uploaded file(s)
            itemType, // This should be defined in your body or set a default
        });

        await newPortfolioItem.save(); // Save the new portfolio item to the database

        res.json({ success: true, message: 'Item uploaded successfully', item: newPortfolioItem });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});


// Cloudinary Media Retrieval Route
router.get('/media', async (req, res) => {
    const { folderName } = req.query; // Get folder name from query parameter

    try {
        // Fetch the images from Cloudinary here
        const { resources } = await cloudinary.search
            .expression(`folder:${folderName}`)
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();

        const images = resources.map((file) => {
            return { url: file.secure_url, public_id: file.public_id };
        });

        if (!images.length) {
            return res.status(404).json({ success: false, message: "No images found in the specified folder." });
        }

        res.json({ success: true, images });
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});


export default router;