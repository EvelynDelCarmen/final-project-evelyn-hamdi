
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expressListEndpoints from "express-list-endpoints";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js"
import mediaRoutes from "./routes/mediaRoutes.js"
import { connectDB } from "./config/db.js";


const port = process.env.PORT;
const app = express();

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res, next) {
  // Handle the get for this route
});

app.post('/', function (req, res, next) {
  // Handle the post for this route
});


app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data


app.use(userRoutes);
app.use(questionRoutes);
app.use(mediaRoutes);



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
  console.log(`Server running on http://localhost:${port}`);
});
