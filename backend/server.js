
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

// app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)

app.use(cors({
  origin: "http://localhost:5173", // or your frontend's deployed URL - HÄR MÅSTE JAG LÄGGA IN MIN FRONTEND URL NÄR DEN ÄR DEPLOYAD
  credentials: true,
}));


app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
// app.use(express.urlencoded({ extended: true }));


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


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
