import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

        // cover 
        return (

            <div className="folder-grid">
                {folders.map((folder) => (
                    <div key={folder.path} className="folder-cover cursor-pointer shadow-lg hover:shadow-xl rounded-lg overflow-hidden" onClick={() => navigate(`/gallery/${folder.path}`)}>
                        <img src={folder.coverImage} alt={`Cover for ${folder.name}`} className="cover-image w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        );
    }


    if (!images.length) {
        return <p>No images to display in this folder.</p>;
    }
    //folders inside
    return (
        <div className="image-grid p-4 bg-black text-white">
            {images.map((image) => (
                <div key={image.public_id} className="image-container overflow-hidden mb-4">
                    <img src={image.url} alt="Gallery" className="object-cover max-w-full h-auto max-h-full" />
                    {/* om jag skulle vilja att bilderna är i en storlek */}
                    {/* className="object-cover max-w-full h-auto max-h-full md:max-w-lg lg:max-w-xl" */}
                </div>
            ))}
        </div>
    );
};




export default ImageGallery;