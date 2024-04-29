// Import the 'create' function from the 'zustand' library.
import { create } from "zustand";

// Get the backend API endpoint from the environment variables.
const apiEnv = import.meta.env.VITE_BACKEND_URL;
if (!apiEnv) {
  console.error('VITE_BACKEND_URL environment variable is not set.');
}


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

      // alert("Please enter username, email, and password");
      // return;

      return { success: false, message: "Please enter username, email, and password" };
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
        set({ username });
        return { success: true, message: "Signup successful! Please log in." };
      } else {
        return { success: false, message: data.response || "Signup failed" };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: "An error occurred during signup" };
    }
  },



  // LOGIN
  handleLogin: async (username, password) => {

    if (!username || !password) {
      return { success: false, message: "Please enter both username and password" };
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



      if (!response.ok) {
        // Handle the non-OK response here
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        set({
          username,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
        });
        localStorage.setItem("accessToken", data.response.accessToken);
        return { success: true, message: "Login successful!" };
      } else {
        return { success: false, message: data.response || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Wrong username or password, try again!" };
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


