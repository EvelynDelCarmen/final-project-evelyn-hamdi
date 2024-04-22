
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expressListEndpoints from "express-list-endpoints";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js"
import mediaRoutes from "./routes/mediaRoutes.js"
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)

// Apply CORS to all responses
// app.use(cors({
//   origin: ['http://localhost:5174'],  // Add more origins as needed
//   credentials: true,  // If your frontend needs to send cookies or authorization headers
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
// }));

// Log the response headers
// app.use((req, res, next) => {
//   res.on('finish', () => {
//     console.log('Response headers:', res.getHeaders());
//   });
//   next();
// });

app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
// app.use(express.urlencoded({ extended: true }));

// This is often handled by the cors() middleware itself, but you can also add this if needed:
// app.options('*', cors()); // Enable preflight for all routes



connectDB();




app.use(userRoutes);
app.use(questionRoutes);
app.use(mediaRoutes);



app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
  console.log("List of Endpoints:");
  console.log(endpoints);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).send('Server Error');
});

// Example of simple request logging
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.path}`);
//   next();
// });



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
