// stores/imageStore.js
import { create } from 'zustand';
import { Cloudinary } from "@cloudinary/url-gen";

const imageStore = create((set) => {
    const cld = new Cloudinary({ cloud: { cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME } });

    return {
        images: [],
        fetchImages: async () => {
            try {
                // eslint-disable-next-line no-unused-vars
                const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;


                // Update the folder path to target 'evelyndelcarmen/homepage'
                const { resources } = await cld.search
                    .expression('folder:evelyndelcarmen/homepage')
                    .execute();

                const imageUrls = resources.map((resource) => resource.secure_url);

                set({ images: imageUrls });
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        },
    };
});

export default imageStore;






// // stores/imageStore.js
// import { create } from 'zustand';
// import { Cloudinary } from "@cloudinary/url-gen";

// const imageStore = create((set) => {
//     const cld = new Cloudinary({ cloud: { cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME } });

//     return {
//         images: [],
//         fetchImages: async (folder) => {
//             try {
//                 const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
//                 const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;

//                 const response = await fetch(
//                     cld.url({ upload_preset: apiKey, api_key: apiKey, api_secret: apiSecret })
//                         .resourceType("image")
//                         .expression({ folder: `${folder}/resources/image` })
//                         .secureDistribution()
//                         .generate()
//                 );

//                 const data = await response.json();

//                 const imageUrls = data.resources.map((resource) => resource.secure_url);

//                 set({ images: imageUrls });
//             } catch (error) {
//                 console.error('Error fetching images:', error);
//             }
//         },
//     };
// });

// export default imageStore;





