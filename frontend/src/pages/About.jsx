// pages/About.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import glitchEffectImage from '../assets/noise.png';



const About = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ask-bey`, { question }, {
                withCredentials: true
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error('Failed to fetch answer:', error);
            setAnswer('Failed to fetch answer. Please try again.');
        }
        setIsLoading(false);
    };

    return (

        <div>
            <div
                className="tv-noise"
                style={{
                    backgroundImage: `url(${glitchEffectImage})`
                    // zIndex: -1, // Ensure it stays in the background
                }}
            />
            <Header />
            <div className="min-h-screen flex flex-col justify-start md:justify-center items-center pt-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-plex-mono">What do you want to know?</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input
                        type="text"
                        value={question}
                        onChange={handleQuestionChange}
                        placeholder="Ask something about Beyoncé..."
                        className="border border-gray-400 rounded-md p-2 mb-2 w-72 text-black font-plex-mono"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-300 py-2 px-4 ${isLoading ? 'opacity-50 cursor-not-allowed font-plex-mono' : ''}`}
                    >
                        {isLoading ? 'Asking...' : 'Ask'}
                    </button>
                </form>
                {answer && <p className="mt-4 font-plex-mono max-w-md mx-auto text-center px-4">{answer}</p>}
            </div>

        </div>
    );
};

export default About;

