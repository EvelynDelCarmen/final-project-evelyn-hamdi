
import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore";
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

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/welcome');
    }
  }, [isLoggedIn, navigate]);

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const result = await handleLogin(loginUsername, loginPassword);
    setMessage(result.message);
  };


  const onSignupSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const result = await handleSignup(signupUsername, signupPassword, signupEmail);
    setMessage(result.message);
    setSignupUsername('');
    setSignupPassword('');
    setSignupEmail('');
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
          {message && <div className="text-base md:text-xl lg:text-3xl font-light mb-4 text-white text-center
">{message}</div>}

        </div>
      </div>
    </div>
  );
};





