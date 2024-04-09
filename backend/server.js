// Import necessary libraries and modules
import express from "express"; // Import the Express.js framework
import cors from "cors"; // Import the CORS middleware
import dotenv from "dotenv"; // Import dotenv for environment variables
import expressListEndpoints from "express-list-endpoints";
dotenv.config(); // Load environment variables from the .env file
import userRoutes from "./routes/userRoutes"; // Import custom user routes
import questionRoutes from "./routes/questionRoutes"
import mediaRoutes from "./routes/mediaRoutes"
import { connectDB } from "./config/db"; // Import database connection function (not used here)

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Use the routes for handling API requests
// ROUTES - These routes USE controller functions ;)
// Use the task-controlled routes for task-related requests
app.use(userRoutes); // Use the user-controlled routes for user-related requests
app.use(questionRoutes); //for the question-beyonce
app.use(mediaRoutes); // for the images/film


// Connection to the database through Mongoose
connectDB();
// Create a dedicated endpoint to view endpoints in the browser
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
  console.log("List of Endpoints:");
  console.log(endpoints);
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});
