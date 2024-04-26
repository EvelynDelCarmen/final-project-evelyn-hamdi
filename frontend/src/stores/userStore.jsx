// Import the 'create' function from the 'zustand' library.
import { create } from "zustand";

// Get the backend API endpoint from the environment variables.
const apiEnv = import.meta.env.VITE_BACKEND_API;

// Create a Zustand store for user-related state and actions.
export const userStore = create((set, get) => ({
  // Initialize username state.
  username: "",
  // Define a function to set the username state.
  setUsername: (username) => set({ username }),

  // Initialize email state.
  email: "",
  // Define a function to set the email state.
  setEmail: (email) => set({ email }),

  // Initialize password state.
  password: "",
  // Define a function to set the password state.
  setPassword: (password) => set({ password }),

  // Initialize accessToken state with null.
  accessToken: null,
  // Define a function to set the accessToken state.
  setAccessToken: (token) => set({ accessToken: token }),

  // Initialize isLoggedIn state with false.
  isLoggedIn: false,
  // Define a function to set the isLoggedIn state.
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // FUNCTION TO REGISTER USERS
  handleSignup: async (username, password, email) => {
    // Check if required fields are provided and display an alert if not.
    if (!username || !password || !email) {
      alert("Please enter username, email, and password");
      return;
    }

    try {
      // Send a POST request to the registration endpoint with user data.
      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
        credentials: 'include',
      });

      // Parse the response data as JSON.
      const data = await response.json();
      if (data.success) {
        // Update the username state.
        set({ username });
        // Display a success alert.
        alert("Signup successful!");
        console.log("Signing up with:", username);
      } else {
        // Display an error message from the server or a generic message.
        alert(data.response || "Signup failed");
      }
    } catch (error) {
      // Handle and log any signup errors.
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  },

  // LOGIN
  handleLogin: async (username, password) => {
    // Check if both username and password are provided and display an alert if not.
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      // Send a POST request to the login endpoint with user data.
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      // Parse the response data as JSON.
      const data = await response.json();
      if (data.success) {
        // Update the state with username, accessToken, and set isLoggedIn to true.
        set({
          username,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
        });
        // Store the accessToken in the browser's localStorage.
        localStorage.setItem("accessToken", data.response.accessToken);
        // Display a success alert.
        alert("Login successful!");
        console.log("Logging in with:", username, password);
      } else {
        // Display an error message from the server or a generic message.
        alert(data.response || "Login failed");
      }
    } catch (error) {
      // Handle and log any login errors.
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  },

  // Function to handle user logout.
  handleLogout: () => {
    // Clear user information and set isLoggedIn to false.
    set({ username: "", accessToken: null, isLoggedIn: false });
    // Remove the accessToken from localStorage.
    localStorage.removeItem("accessToken");
    // Additional logout logic can be added here if needed.
  },
}));


