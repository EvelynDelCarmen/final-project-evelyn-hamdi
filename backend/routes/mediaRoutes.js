
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
            folder: req.body.folderName || 'Home', // Use folder name from the request, or a default
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



router.get('/media', async (req, res) => {
    console.log('Media endpoint hit, folderName:', req.query.folderName);
    const { folderName } = req.query; // Get folder name from query parameter

    try {
        if (folderName) {
            // Fetch the images from a specified folder
            const { resources } = await cloudinary.search
                .expression(`folder:${folderName}`)
                .sort_by('public_id', 'desc')
                .max_results(30)
                .execute();

            console.log(resources);

            const images = resources.map((file) => {
                return { url: file.secure_url, public_id: file.public_id };
            });

            if (!images.length) {
                return res.status(404).json({ success: false, message: "No images found in the specified folder." });
            }

            res.json({ success: true, images });
        } else {
            // If no folderName is provided, fetch cover images for specified folders
            const folderCoversPromises = ['bey_01', 'bey_02', 'bey_03', 'bey_04', 'bey_07', 'bey_06', 'bey_05', 'bey_08', 'bey_09', 'bey_10', 'bey_11', 'bey_12', 'bey_13', 'bey_14'].map(async (folderName) => {
                const { resources } = await cloudinary.search
                    .expression(`folder:${folderName}`)
                    .sort_by('created_at', 'asc')
                    .max_results(1)
                    .execute();

                const coverImage = resources[0] ? resources[0].secure_url : 'https://res.cloudinary.com/djiqa469b/image/upload/v1713996661/Lemonade/afryka01_cfmlaz.jpg';
                return { name: folderName, path: folderName, coverImage };
            });

            const folderCovers = await Promise.all(folderCoversPromises);
            res.json({ success: true, folders: folderCovers });
        }
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});




export default router;