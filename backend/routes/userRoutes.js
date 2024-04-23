import express from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/userController";

const router = express.Router();


router.post("/register", registerUserController); // When a POST request is made to /register, execute the registerUserController function


router.post("/login", loginUserController); // When a POST request is made to /login, execute the loginUserController function


export default router;

