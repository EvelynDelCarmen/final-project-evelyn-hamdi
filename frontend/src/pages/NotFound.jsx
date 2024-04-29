import React from 'react';
import Button from '../components/reusecomponents/Button';

// Define the 'NotFound' functional component.
export const NotFound = () => {
  // Image URL (replace 'your_image_url_here' with your actual image URL)
  const imageUrl = 'https://res.cloudinary.com/djiqa469b/image/upload/v1714333019/bey_extra/bey_project_44_rctdm9.jpg';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center font-plex-mono px-4">
      <div className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Oh oh, you are leaving the beyhive...</div>
      <img src={imageUrl} alt="Image of beyonce" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto my-4" />
      <div>
        <Button to="/" text="Go back to the BeyHive!" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300" />
      </div>
    </div>
  );
};


