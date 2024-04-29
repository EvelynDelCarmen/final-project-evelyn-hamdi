
// import { Link } from "react-router-dom";
// import { userStore } from "../stores/userStore"; // Adjust the import path as needed
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from '../components/Header';


// export const Login = () => {
//   // State for login
//   const [loginUsername, setLoginUsername] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   // State for signup
//   const [signupUsername, setSignupUsername] = useState("");
//   const [signupPassword, setSignupPassword] = useState("");
//   const [signupEmail, setSignupEmail] = useState("");

//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");


//   const { handleLogin, handleSignup } = userStore((state) => ({
//     handleLogin: state.handleLogin,
//     handleSignup: state.handleSignup,
//   }));

//   // Login submission
//   const onLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const success = await handleLogin(loginUsername, loginPassword);
//       if (success) navigate("/welcome");

//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred during login.");
//     }
//   };

//   // Signup submission
//   const onSignupSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await handleSignup(signupUsername, signupPassword, signupEmail);

//       // Optionally clear the form or navigate
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert("An error occurred during signup.");
//     }
//   };
//   return (
//     <div>
//       <Header />



//       <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white font-plex-mono">
//         <div className="w-full max-w-md space-y-8">
//           <h2 className="text-3xl font-bold mb-4 text-white text-center">Sign Up</h2>
//           <form onSubmit={onSignupSubmit} className="flex flex-col items-center">
//             <input
//               className="border border-gray-300 rounded-md p-2 mb-2 w-72 text-white bg-gray-800"
//               type="text"
//               placeholder="Username"
//               value={signupUsername}
//               onChange={(e) => setSignupUsername(e.target.value)}
//             />
//             <input
//               className="border border-gray-300 rounded-md p-2 mb-2 w-72 text-white bg-gray-800"
//               type="email"
//               placeholder="Email"
//               value={signupEmail}
//               onChange={(e) => setSignupEmail(e.target.value)}
//             />
//             <input
//               className="border border-gray-300 rounded-md p-2 mb-2 w-72 text-white bg-gray-800"
//               type="password"
//               placeholder="Password"
//               value={signupPassword}
//               onChange={(e) => setSignupPassword(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="mb-4 md:mb-0 md:mr-4 font-plex-mono bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
//             >
//               Sign Up
//             </button>
//           </form>
//           <h2 className="text-3xl font-bold mb-4 text-white text-center">Login</h2>
//           <form onSubmit={onLoginSubmit} className="flex flex-col items-center">
//             <input
//               className="border border-gray-300 rounded-md p-2 mb-2 w-72 text-white bg-gray-800"
//               type="text"
//               placeholder="Username"
//               value={loginUsername}
//               onChange={(e) => setLoginUsername(e.target.value)}
//             />
//             <input
//               className="border border-gray-300 rounded-md p-2 mb-2 w-72 text-white bg-gray-800"
//               type="password"
//               placeholder="Password"
//               value={loginPassword}
//               onChange={(e) => setLoginPassword(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="mb-4 md:mb-0 md:mr-4 font-plex-mono bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };


import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore"; // Adjust the import path as needed
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Header from '../components/Header';


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


  const { handleLogin, isLoggedIn, handleSignup } = userStore((state) => ({
    handleLogin: state.handleLogin,
    isLoggedIn: state.isLoggedIn,
    handleSignup: state.handleSignup,
  }));

  // Navigate to '/welcome' when 'isLoggedIn' becomes true
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/welcome');
    }
  }, [isLoggedIn, navigate]);

  // Login submission
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(loginUsername, loginPassword);
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  // Signup submission
  const onSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignup(signupUsername, signupPassword, signupEmail);
      // No navigation after signup, maybe clear the form or show a message
      setSignupUsername('');
      setSignupPassword('');
      setSignupEmail('');
      // You can set a message or handle the UI response here
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <div>
      <Header />



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
    </div>
  );
};



