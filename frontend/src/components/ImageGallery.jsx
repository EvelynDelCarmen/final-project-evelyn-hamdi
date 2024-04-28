// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import useImageStore from '../stores/imagestore';

// const ImageGallery = () => {
//     const { images, folders, fetchImages, isLoading, error } = useImageStore();
//     const { folderName } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchImages(folderName);
//     }, [fetchImages, folderName]); // Dependency array includes folderName to refetch when it changes

//     if (isLoading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     if (!folderName) {

//         // cover 
//         return (

//             <div className="folder-grid">
//                 {folders.map((folder) => (
//                     <div key={folder.path} className="folder-cover cursor-pointer shadow-lg hover:shadow-xl rounded-lg overflow-hidden" onClick={() => navigate(`/gallery/${folder.path}`)}>
//                         <img src={folder.coverImage} alt={`Cover for ${folder.name}`} className="cover-image w-full h-full object-cover" />
//                     </div>
//                 ))}
//             </div>
//         );
//     }


//     if (!images.length) {
//         return <p>No images to display in this folder.</p>;
//     }
//     //folders inside
//     return (
//         <div className="image-grid p-4 bg-black text-white">
//             {images.map((image) => (
//                 <div key={image.public_id} className="image-container overflow-hidden mb-4">
//                     <img src={image.url} alt="Gallery" className="object-cover max-w-full h-auto max-h-full" />
//                     {/* om jag skulle vilja att bilderna är i en storlek */}
//                     {/* className="object-cover max-w-full h-auto max-h-full md:max-w-lg lg:max-w-xl" */}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ImageGallery;

// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import useImageStore from '../stores/imagestore';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';

// const ImageGallery = () => {
//     const { images, folders, fetchImages, isLoading, error } = useImageStore();
//     const { folderName } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchImages(folderName);
//     }, [fetchImages, folderName]);

//     useEffect(() => {
//         if (images.length) {
//             gsap.registerPlugin(ScrollTrigger);
//             gsap.from(".image-container", {
//                 opacity: 0,
//                 x: -100,
//                 stagger: 0.1,
//                 scrollTrigger: {
//                     trigger: ".image-grid",
//                     start: "left-right",
//                     end: "right-left",
//                     toggleActions: "play none none reverse",
//                     markers: false,
//                 }
//             });
//             return () => {
//                 // Kill all ScrollTriggers to avoid any leaks
//                 ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//             };
//         }
//     }, [images]);

//     if (isLoading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     if (!folderName) {
//         return (
//             <div className="folder-grid">
//                 {folders.map((folder) => (
//                     <div key={folder.path} className="folder-cover cursor-pointer shadow-lg hover:shadow-xl rounded-lg overflow-hidden" onClick={() => navigate(`/gallery/${folder.path}`)}>
//                         <img src={folder.coverImage} alt={`Cover for ${folder.name}`} className="cover-image w-full h-full object-cover" />
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     if (!images.length) {
//         return <p>No images to display in this folder.</p>;
//     }

//     return (
//         <div className="image-grid p-4 bg-black text-white">
//             {images.map((image) => (
//                 <div key={image.public_id} className="image-container overflow-hidden mb-4">
//                     <img src={image.url} alt="Gallery" className="object-cover max-w-full h-auto max-h-full" />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ImageGallery;

import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useImageStore from '../stores/imagestore';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const ImageGallery = () => {
    const { images, folders, fetchImages, isLoading, error } = useImageStore();
    const { folderName } = useParams();
    const navigate = useNavigate();
    const galleryRef = useRef(); // Ref for the gallery container

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        fetchImages(folderName);
    }, [fetchImages, folderName]);

    // useEffect(() => {
    //     if (!isLoading && images.length) {
    //         const panels = gsap.utils.toArray('.image-container', galleryRef.current);
    //         gsap.to(panels, {
    //             xPercent: -100 * (panels.length - 1),
    //             ease: "none",
    //             scrollTrigger: {
    //                 trigger: galleryRef.current,
    //                 pin: true,
    //                 scrub: 1,
    //                 snap: 1 / (panels.length - 1),
    //                 end: () => "+=" + galleryRef.current.offsetWidth,
    //                 // markers: true // Uncomment during development to see markers
    //             }
    //         });
    //     }
    // }, [images, isLoading]);


    // useEffect(() => {
    //     if (!isLoading && images.length) {
    //         // Delay GSAP initialization to ensure the DOM elements are available
    //         setTimeout(() => {
    //             const panels = gsap.utils.toArray('.image-container', galleryRef.current);
    //             gsap.to(panels, {
    //                 xPercent: -100 * (panels.length - 1),
    //                 ease: "none",
    //                 scrollTrigger: {
    //                     trigger: galleryRef.current,
    //                     pin: true,
    //                     scrub: 1,
    //                     snap: 1 / (panels.length - 1),
    //                     end: () => `+=${galleryRef.current.offsetWidth}`,
    //                     // markers: true // Uncomment for debugging
    //                 }
    //             });
    //         }, 0);
    //     }
    // }, [images, isLoading]);
    // useEffect(() => {
    //     if (!isLoading && images.length && galleryRef.current) {
    //         // Now that images have been fetched and the DOM has been rendered
    //         // and we have confirmed that galleryRef.current is not undefined...

    //         const panels = gsap.utils.toArray('.image-container', galleryRef.current);
    //         gsap.to(panels, {
    //             xPercent: -100 * (panels.length - 1),
    //             ease: "none",
    //             scrollTrigger: {
    //                 trigger: galleryRef.current,
    //                 pin: true,
    //                 scrub: 1,
    //                 snap: 1 / (panels.length - 1),
    //                 end: () => galleryRef.current ? "+=" + galleryRef.current.offsetWidth : "+=500",
    //                 markers: true // Uncomment for debugging
    //             }
    //         });

    useEffect(() => {
        if (!isLoading && images.length && galleryRef.current) {
            const panels = gsap.utils.toArray('.image-container', galleryRef.current);

            // If you want to start the animation as soon as the images are in view,
            // use 'left center' for horizontal scrolling
            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "left center", // The animation starts as soon as the element comes into view
                    end: () => `+=${galleryRef.current.scrollWidth}`,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    // markers: true // For debugging
                }
            });
            console.log(scrollTriggerInstance.scrollTrigger); // Log the ScrollTrigger instance

            return () => {
                scrollTriggerInstance.scrollTrigger.kill(); // Cleanup ScrollTrigger
            };
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
        <div className="image-grid flex overflow-x-auto p-4 bg-black text-white">
            {images.map((image) => (
                <div key={image.public_id} className="image-container flex-shrink-0 overflow-hidden mb-4">
                    <img src={image.url} alt="Gallery" className="object-cover w-full h-auto" />
                </div>
            ))}
        </div>

    );
};

export default ImageGallery;
