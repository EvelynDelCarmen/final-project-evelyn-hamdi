import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Masonry from 'masonry-layout';
import useImageStore from '../stores/imagestore';

const ImageGallery = () => {
    // const { images, fetchImages, isLoading, error } = useImageStore();
    const { folderName } = useParams();
    const navigate = useNavigate();
    const { images, folders, fetchImages, isLoading, error } = useImageStore();

    useEffect(() => {
        if (folderName) {
            // If a folderName is provided in the URL, fetch images from that folder
            fetchImages(folderName);
        } else {
            // If no folderName is provided, fetch the list of folders
            fetchImages();
        }
    }, [fetchImages, folderName]); // Dependency array includes folderName to refetch when it changes

    // Handler for when a folder is clicked
    const handleFolderClick = (folder) => {
        // Navigate to the image gallery view of the clicked folder
        navigate(`/gallery/${folder.path}`);
    };


    if (!images || images.length === 0) {
        // If images are not loaded yet or are empty, display a loading message or return null
        return <p>Loading images...</p>;
    }

    // return (
    //     <div className="masonry p-4">
    //         {images.map((image) => (
    //             <div key={image.public_id} className="masonry-image overflow-hidden rounded-lg">
    //                 <img src={image.url} alt="Gallery" className="object-cover w-full h-full transform transition duration-500 hover:scale-110" />
    //             </div>
    //         ))}
    //     </div>
    // );

    return (
        <div className="masonry p-4 bg-black text-white">
            {folderName ? (
                // If folderName is present, we're displaying images
                <div className="masonry">
                    {images.map((image) => (
                        <div key={image.public_id} className="masonry-image overflow-hidden rounded-lg mb-4">
                            <img src={image.url} alt="Gallery" className="object-cover w-full h-full transform transition duration-500 hover:scale-110" />
                        </div>
                    ))}
                </div>
            ) : (
                // If no folderName, we're displaying folders
                <div className="folder-grid">
                    {folders.map((folder) => (
                        <div key={folder.path} className="folder-cover" onClick={() => handleFolderClick(folder)}>
                            <img src={folder.coverImage} alt={`Cover for ${folder.name}`} className="cover-image" />

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};



export default ImageGallery;