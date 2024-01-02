/* eslint-disable no-undef */
// stores/imageStore.js
import { create } from 'zustand';

const imageStore = create((set) => ({
    images: [],
    fetchImages: async (folder) => {
        try {
            // Fetch image URLs directly from Cloudinary using the specified folder
            const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
            // eslint-disable-next-line no-undef
            const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
            // eslint-disable-next-line no-undef
            const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${folder}/resources/image?api_key=${apiKey}&api_secret=${apiSecret}`);

            const data = await response.json();

            // Extract image URLs from the Cloudinary response
            const imageUrls = data.resources.map((resource) => resource.secure_url);

            set({ images: imageUrls });
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    },
}));

export default imageStore;


