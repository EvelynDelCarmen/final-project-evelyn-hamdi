
import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore"; // Adjust the import path as needed
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Logos from "../components/Logos"; // Ensure this is correctly imported

export const Login = () => {
  // State for login
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // State for signup
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");

  const navigate = useNavigate();
  const [message, setMessage] = useState("");


  const { handleLogin, handleSignup } = userStore((state) => ({
    handleLogin: state.handleLogin,
    handleSignup: state.handleSignup,
  }));

  // Login submission
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await handleLogin(loginUsername, loginPassword);
      if (success) navigate("/home");
      else alert("Login failed.");
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  // Signup submission
  const onSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignup(signupUsername, signupPassword, signupEmail);
      alert("Signup successful. Please log in.");
      // Optionally clear the form or navigate
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white font-plex-mono">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-3xl font-bold mb-4 text-white text-center">Sign Up</h2>
        <form onSubmit={onSignupSubmit} className="flex flex-col items-center">
          <input
            className="border border-gray-300 rounded-md p-2 mb-2 w-72 text-white bg-gray-800"
            type="text"
            placeholder="Username"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-md p-2 mb-2 w-72 text-white bg-gray-800"
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-md p-2 mb-2 w-72 text-white bg-gray-800"
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mb-4 md:mb-0 md:mr-4 font-plex-mono bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
        <h2 className="text-3xl font-bold mb-4 text-white text-center">Login</h2>
        <form onSubmit={onLoginSubmit} className="flex flex-col items-center">
          <input
            className="border border-gray-300 rounded-md p-2 mb-2 w-72 text-white bg-gray-800"
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-md p-2 mb-2 w-72 text-white bg-gray-800"
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mb-4 md:mb-0 md:mr-4 font-plex-mono bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
//       <div className="w-full max-w-md space-y-8">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Sign Up
//         </h2>
//         <form onSubmit={onSignupSubmit} className="mt-8 space-y-6">
//           <input
//             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//             type="text"
//             placeholder="Username"
//             value={signupUsername}
//             onChange={(e) => setSignupUsername(e.target.value)}
//           />
//           <input
//             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//             type="email"
//             placeholder="Email"
//             value={signupEmail}
//             onChange={(e) => setSignupEmail(e.target.value)}
//           />
//           <input
//             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//             type="password"
//             placeholder="Password"
//             value={signupPassword}
//             onChange={(e) => setSignupPassword(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>
//         </form>

//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Login
//         </h2>
//         <form onSubmit={onLoginSubmit} className="mt-8 space-y-6">
//           <input
//             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//             type="text"
//             placeholder="Username"
//             value={loginUsername}
//             onChange={(e) => setLoginUsername(e.target.value)}
//           />
//           <input
//             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//             type="password"
//             placeholder="Password"
//             value={loginPassword}
//             onChange={(e) => setLoginPassword(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// SUMMARY

// This code defines the Login component, which handles user login functionality. It imports necessary components, hooks, and the user store, and it defines state variables for username and password. The component also provides a form for entering login credentials, handles the login button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'Logos' component.
