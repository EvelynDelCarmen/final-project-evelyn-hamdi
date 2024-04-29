

import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useImageStore from '../stores/imagestore';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Header from './Header';


const ImageGallery = () => {
    const { images, folders, fetchImages, isLoading, error } = useImageStore();
    const { folderName } = useParams();
    const navigate = useNavigate();
    const galleryRef = useRef(); // Ref for the gallery container

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        fetchImages(folderName);
    }, [fetchImages, folderName]);


    useEffect(() => {
        if (!isLoading && images.length && galleryRef.current) {
            // Determine if we're on a mobile device based on window width
            const isMobile = window.innerWidth < 768; // Example breakpoint for mobile devices

            if (!isMobile) {
                // Desktop/Tablet horizontal scrolling
                const panels = gsap.utils.toArray('.image-container', galleryRef.current);

                gsap.to(panels, {
                    xPercent: -100 * (panels.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top top", // Start when the top of the trigger hits the top of the viewport
                        end: () => `+=${galleryRef.current.scrollWidth}`,
                        pin: true,
                        scrub: 1,
                        snap: 1 / (panels.length - 1),
                        // markers: true // Uncomment for debugging purposes
                    }
                });

                return () => {
                    // Cleanup ScrollTrigger instances
                    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                };
            }
            // Mobile devices use normal scrolling, no need for ScrollTrigger
        }
    }, [images, isLoading]);


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
        <div>
            <Header />

            <div className="image-grid flex overflow-x-auto p-4 bg-black text-white space-x-4">
                {images.map((image) => (
                    <div key={image.public_id} className="image-container flex-shrink-0 overflow-hidden mb-4">
                        <img src={image.url} alt="Gallery" className="h-screen w-full object-cover" />
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ImageGallery;
