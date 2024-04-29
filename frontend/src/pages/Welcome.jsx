import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore"; // Adjust path as needed

export const Welcome = () => {
    const navigate = useNavigate();
    const logout = userStore(state => state.handleLogout);
    const imageUrl = 'https://res.cloudinary.com/djiqa469b/image/upload/v1714351162/bey_extra/bey_project_25_ec6jvc.png';

    const onSignOut = () => {
        logout(); // This should clear the token and update the isLoggedIn state.
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center font-plex-mono px-4">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-4">Welcome to the BeyHive!</div>
            <img src={imageUrl} alt="Image of Beyonce" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto my-4" />
            <p className="mb-4 text-lg sm:text-xl text-white">This is a protected area of the app</p>
            <button
                onClick={onSignOut}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
            >
                Sign Out
            </button>
        </div>


    );
};