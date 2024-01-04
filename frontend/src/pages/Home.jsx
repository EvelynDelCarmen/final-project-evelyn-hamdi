// pages/Home.jsx
import 'react';
// import ImageGallery from '../components/ImageGallery';
import Button from '../reusecomponents/Button';

const Home = () => {
    return (
        <div className="container mx-auto my-8">
            <h1 className="font-archivoBlack text-3xl font-bold mb-4">Del Carmen</h1>
            {/* Display different galleries for different folders */}
            {/* <ImageGallery folder="evelyndelcarmen" /> */}
            {/* Add more galleries as needed */}

            {/* Add a button to navigate to the Contact page */}
            <Button to="/contact" text="Contact Page" className="font-archivoBlack flex-col text-black px-4 py-2" />
            <Button to="/about" text="About" className="font-archivoBlack flex-col text-black px-4 py-2" />
        </div>
    );
};

export default Home;





























// // Import necessary dependencies and components.
// import { useEffect } from "react";
// import { userStore } from "../stores/userStore";
// import { useNavigate } from "react-router-dom";
// import Logos from "../components/Logos";
// import { Link } from "react-router-dom";

// // Define the 'Home' functional component.
// export const Home = () => {
//   // Define text content for the heading and subheading.
//   const text = {
//     heading: "Vite + React + React Router + Minimal CSS",
//     subheading: "Home Page",
//     intro: "text here...",
//   };

//   // Access the 'handleLogout' function from the 'userStore'.
//   const storeHandleLogout = userStore((state) => state.handleLogout);

//   // Use the 'useNavigate' hook to programmatically navigate between routes.
//   const navigate = useNavigate();

//   // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
//   const { isLoggedIn, accessToken } = userStore();
//   console.log(isLoggedIn);
//   console.log(accessToken);

//   // useEffect hook to check user authentication status.
//   useEffect(() => {
//     if (!isLoggedIn) {
//       // If the user is not logged in, show an alert and navigate to the login route.
//       alert("no permission - here");
//       navigate("/"); // You can change this to the login route
//     }
//   }, [isLoggedIn]);

//   // Function to handle the click event of the logout button.
//   const onLogoutClick = () => {
//     storeHandleLogout(); // Call the 'handleLogout' function from 'userStore'.
//     // Additional logic after logout can be added here.
//     alert("Log out successful");
//     navigate("/"); // You can change this to the login route
//   };

//   // Render the component content.
//   return (
//     <>
//       <nav>
//         {/* Create a navigation menu with links to various routes. */}
//         <ul className="app-ul">
//           <li className="app-li">
//             <Link to="/home">Home</Link>
//           </li>
//           <li className="app-li">
//             <Link to="/tasks">Tasks</Link>
//           </li>
//           <li className="app-li">
//             {/* Create a button for logging out and attach the 'onLogoutClick' event handler. */}
//             <button onClick={onLogoutClick}>Sign Out</button>
//           </li>
//         </ul>
//       </nav>
//       {/* Render the 'Logos' component. */}
//       <Logos />
//       {/* Display the heading and subheading. */}
//       <h1 className="heading">{text.heading}</h1>
//       <h2>{text.subheading}</h2>
//       {/* (Note: 'text.intro' is not defined in the code.) */}
//       {/* Display additional content (text.intro is missing). */}
//       <p>{text.intro}</p>
//     </>
//   );
// };
