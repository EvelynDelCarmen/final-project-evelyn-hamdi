// components/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, text, className }) => {
    return (
        <Link to={to} className={`${className} inline-block px-4 py-2 text-center transition-colors duration-300 ease-in-out`}>
            {text}
        </Link>
    );
};

export default Button;

