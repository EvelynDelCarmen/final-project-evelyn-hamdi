// pages/About.jsx
import React, { useState } from 'react';
import axios from 'axios';

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
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-4">About Beyoncé</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    value={question}
                    onChange={handleQuestionChange}
                    placeholder="Ask something about Beyoncé..."
                    className="border border-gray-400 rounded-md p-2 mb-2 w-72 text-black"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-blue-500 text-white rounded-md py-2 px-4 ${isLoading && 'opacity-50 cursor-not-allowed'}`}
                >
                    {isLoading ? 'Asking...' : 'Ask'}
                </button>
            </form>
            {answer && <p className="mt-4">{answer}</p>}
        </div>
    );
};

export default About;

