import React from 'react';
import Logo from './reusecomponents/Logo';
import Button from './reusecomponents/Button';

const Header = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center py-6 md:py-8 text-center">

                {/* Logo appears second on mobile and centered on desktop */}
                <div className="md:order-2 mb-4 md:mb-0">
                    <Logo />
                </div>

                {/* About button appears first on mobile and left on desktop */}
                <div className="md:order-1">
                    <Button to="/about" text="About" className="mb-4 md:mb-0 md:mr-4 font-plex-mono" />
                </div>


                {/* Contact button appears last on mobile and right on desktop */}
                <div className="md:order-3">
                    <Button to="/login" text="Login" className="md:ml-4 font-plex-mono" />
                </div>
            </div>
        </div>
    );
};

export default Header;




