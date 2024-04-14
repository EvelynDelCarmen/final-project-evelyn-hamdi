import React, { useEffect } from 'react';
import useImageStore from '../stores/imagestore'; // Adjust the import path as needed

const ImageGallery = () => {
    const { images, fetchImages, isLoading, error } = useImageStore();

    useEffect(() => {
        // Call the fetchImages function with the specific folder you want to display images from.
        fetchImages('samples');
    }, [fetchImages]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {images.map((image) => (
                <div key={image.public_id} className="overflow-hidden rounded-lg">
                    <img src={image.url} alt="Gallery" className="object-cover w-full h-full transform transition duration-500 hover:scale-110" />
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;






