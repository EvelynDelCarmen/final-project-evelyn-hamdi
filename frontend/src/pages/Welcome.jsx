import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore"; // Adjust path as needed

export const Welcome = () => {
    const navigate = useNavigate();
    const logout = userStore(state => state.handleLogout);
    const imageUrl = 'https://res.cloudinary.com/djiqa469b/image/upload/v1714333019/bey_extra/bey_project_44_rctdm9.jpg';

    const onSignOut = () => {
        logout(); // This should clear the token and update the isLoggedIn state.
        navigate('/'); // Redirect the user to the login page.
    };

    return (
        <div className="welcome-container text-center font-plex-mono">

            <div className="text-3xl font-bold text-white-800 mb-4">Welcome the BeyHive!</div>

            <img src={imageUrl} alt="Image of beyonce" className="mx-auto my-4" />
            <p className="mb-4 text-lg text-white-600">This is a protected area of the app</p>


            <button
                onClick={onSignOut}
                className="mb-4 md:mb-0 md:mr-4 font-plex-mono bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
            >
                Sign Out
            </button>
        </div>


    );
};