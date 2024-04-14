import express from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/userController";

const router = express.Router();


router.post("/register", registerUserController); // When a POST request is made to /register, execute the registerUserController function


router.post("/login", loginUserController); // When a POST request is made to /login, execute the loginUserController function


export default router;

// In summary, this file sets up routes using the Express router for user registration and login operations. It associates each route with the corresponding controller function. These routes define the API endpoints for handling user registration and login within the application.
