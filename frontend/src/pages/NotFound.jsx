import React from 'react';
import Button from '../components/reusecomponents/Button';

// Define the 'NotFound' functional component.
export const NotFound = () => {
  // Image URL (replace 'your_image_url_here' with your actual image URL)
  const imageUrl = 'https://res.cloudinary.com/djiqa469b/image/upload/v1714333019/bey_extra/bey_project_44_rctdm9.jpg';

  return (
    <div className="not-found-container text-center font-plex-mono">
      <div className="not-found">Oh oh, you are leaving the beyive....</div>
      <img src={imageUrl} alt="Descriptive alt text" className="mx-auto my-4" />
      <div>
        <Button to="/" text="Go back to the BeyHive!" className="mb-4 md:mb-0 md:mr-4 font-plex-mono bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300" />
      </div>
    </div>
  );
};


