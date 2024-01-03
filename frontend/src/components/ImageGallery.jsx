// // components/ImageGallery.jsx
// import { useEffect } from 'react';
// import { Image, Transformation } from 'cloudinary-react';
// import imageStore from '../stores/imagestore';

// const ImageGallery = ({ folder }) => {
//     const images = imageStore((state) => state.images);
//     const fetchImages = imageStore((state) => state.fetchImages);

//     useEffect(() => {
//         // Fetch images for the specified folder when the component mounts
//         fetchImages(folder);
//     }, [fetchImages, folder]);

//     return (
//         <div className="my-8">
//             <h2 className="text-xl font-semibold mb-4">{folder} Gallery</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {images.map((publicId, index) => (
//                     <div key={index} className="overflow-hidden">
//                         {/* Use the Cloudinary React component to display images */}
//                         <Image publicId={publicId} className="w-full h-48 object-cover" alt={`Image ${index}`} >
//                             <Transformation width="300" height="200" crop="fill" />
//                         </Image>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ImageGallery;



