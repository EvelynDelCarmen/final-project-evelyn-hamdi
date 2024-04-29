import React from 'react';
import Logo from './reusecomponents/Logo';
import Button from './reusecomponents/Button';

const Header = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Adjust the flex-direction and item alignment for desktop */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start py-6 md:py-8 text-center md:text-left">

                {/* Logo appears second on mobile and left-most on desktop */}
                <div className="order-2 md:order-1 mb-4 md:mb-0">
                    <Logo />
                </div>

                {/* Contact button appears last on mobile and next to the logo on desktop */}
                <div className="order-2 md:order-2">
                    <Button to="/login" text="Login" className="md:ml-4 font-plex-mono" />
                </div>

                {/* About button appears first on mobile and next on desktop */}
                <div className="order-3 md:order-3">
                    <Button to="/about" text="About" className="mb-4 md:mb-0 md:mr-4 font-plex-mono" />
                </div>

            </div>
        </div>
    );
};

export default Header;




