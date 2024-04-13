
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expressListEndpoints from "express-list-endpoints";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js"
import mediaRoutes from "./routes/mediaRoutes.js"
import { connectDB } from "./config/db.js";


const port = process.env.PORT; // Set the port number for the server
const app = express(); // Create an instance of the Express application


app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data


app.use(userRoutes); // Use the user-controlled routes for user-related requests
app.use(questionRoutes); //for the question-beyonce
app.use(mediaRoutes); // for the images/film



connectDB();

app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
  console.log("List of Endpoints:");
  console.log(endpoints);
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});
