
import express from "express";
import { PortfolioItemModel } from "../models/PortfolioItemModel";
import { authenticateUser } from "../middleware/authenticateUser";
import cloudinary from '../config/cloudinaryConfig'; // Import Cloudinary configuration
import multer from 'multer'; // Import Multer for file handling
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

router.post('/create-folder', async (req, res) => {
    try {
        let folderName = req.body.folderName; // Get folder name from request body

        // Validate folder name
        if (!folderName) {
            return res.status(400).json({ success: false, response: "Folder name is required." });
        }

        // Check if the folder name already exists in your database
        const existingFolder = await ImageModel.findOne({ folderName: folderName });
        if (existingFolder) {
            return res.status(400).json({ success: false, response: "Folder name already exists." });
        }


        // Create a new ImageModel instance with the folder name
        const newFolder = new ImageModel({ folderName: folderName });
        await newFolder.save(); // Save the new folder record to the database

        res.json({ success: true, folderName });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

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
    try {
        const folderName = req.query.folderName; // Get folder name from query parameter
        const imageIds = req.query.imageIds; // Get specific image IDs from query parameter

        let images;

        if (folderName) {
            // Find all images in the specified folder
            images = await ImageModel.find({ folderName: folderName });
        } else if (imageIds) {
            // Find specific images by their IDs
            const ids = imageIds.split(','); // Assuming imageIds are sent as a comma-separated string
            images = await ImageModel.find({ '_id': { $in: ids } });
        } else {
            return res.status(400).json({ success: false, response: "Folder name or image IDs are required." });
        }

        if (images.length === 0) {
            return res.status(404).json({ success: false, response: "No images found." });
        }

        res.json({ success: true, images: images });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

export default router;