// import { create } from 'zustand';
// import axios from 'axios';

// const useImageStore = create((set) => ({
//     images: [],
//     isLoading: false,
//     error: null,
//     fetchImages: async (folderName) => {
//         set({ isLoading: true, error: null });
//         const url = `${import.meta.env.VITE_BACKEND_URL}/media`; // Construct the URL
//         console.log("Attempting to fetch from URL:", url); // Log the URL to console

//         try {
//             const response = await axios.get(url, {
//                 params: { folderName: folderName }
//             });
//             console.log('Images received:', response.data.images);
//             set({ images: response.data.images, isLoading: false });
//         } catch (error) {
//             console.error('Error fetching images:', error);
//             set({ isLoading: false, error: error.message });
//         }
//     },
// }));

// export default useImageStore;









import { create } from 'zustand';
import axios from 'axios';

const useImageStore = create((set) => ({
    images: [],
    isLoading: false,
    error: null,
    fetchImages: async (folderName) => {
        set({ isLoading: true, error: null });
        const url = `${import.meta.env.VITE_BACKEND_URL}/media`; // Construct the URL
        console.log("Attempting to fetch from URL:", url); // Log the URL to console

        try {
            const response = await axios.get(url, {
                params: { folderName: folderName }
            });
            console.log('Images received:', response.data.images);
            set({ images: response.data.images, isLoading: false });
        } catch (error) {
            console.error('Error fetching images:', error);
            set({ isLoading: false, error: error.message });
        }
    },
}));

export default useImageStore;


