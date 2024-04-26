import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Masonry from 'masonry-layout';
import useImageStore from '../stores/imagestore';

const ImageGallery = () => {
    const { images, folders, fetchImages, isLoading, error } = useImageStore();
    const { folderName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchImages(folderName);
    }, [fetchImages, folderName]); // Dependency array includes folderName to refetch when it changes

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!folderName) {
        // Display folders if no specific folder is selected
        return (
            <div className="folder-grid">
                {folders.map((folder) => (
                    <div key={folder.path} className="folder-cover" onClick={() => navigate(`/gallery/${folder.path}`)}>
                        <img src={folder.coverImage} alt={`Cover for ${folder.name}`} className="cover-image" />
                        {/* <p>{folder.name}</p> */}
                    </div>
                ))}
            </div>
        );
    }

    // Display images of a specific folder
    if (!images.length) {
        return <p>No images to display in this folder.</p>;
    }

    return (
        <div className="masonry p-4 bg-black text-white">
            {images.map((image) => (
                <div key={image.public_id} className="masonry-image overflow-hidden rounded-lg mb-4">
                    <img src={image.url} alt="Gallery" className="object-cover w-full h-full transform transition duration-500 hover:scale-110" />
                </div>
            ))}
        </div>
    );
};




export default ImageGallery;