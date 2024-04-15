// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import useImageStore from '../stores/imagestore';

// const DetailedGallery = () => {
//     const { folderName } = useParams();
//     const { imagesByFolder, fetchImages, isLoading, error } = useImageStore();

//     useEffect(() => {
//         fetchImages([folderName]);
//     }, [folderName, fetchImages]);

//     if (isLoading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="gallery">
//             {imagesByFolder[folderName]?.map((image) => (
//                 <img key={image.public_id} src={image.url} alt="Detailed view" />
//             ))}
//         </div>
//     );
// };

// export default DetailedGallery;

