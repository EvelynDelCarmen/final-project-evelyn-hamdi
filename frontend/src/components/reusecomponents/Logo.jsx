// components/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/" className="text-white text-3xl font-bold tracking-wider font-rubik-mono-one">
            Beyonce
        </Link>
    );
};

export default Logo;
