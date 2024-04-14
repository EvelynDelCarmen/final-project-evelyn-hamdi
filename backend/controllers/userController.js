import { UserModel } from "../models/UserModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// import jwt from "jsonwebtoken";


export const registerUserController = asyncHandler(async (req, res) => {

  const { username, password, email } = req.body;

  try {

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(400);
      throw new Error(
        `User with ${existingUser.username === username ? "username" : "email"
        } already exists`
      );
    }


    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();


    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
        accessToken: newUser.accessToken,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
});


export const loginUserController = asyncHandler(async (req, res) => {

  const { username, password } = req.body;

  try {

    console.log("Username:", username);
    console.log("Password:", password);

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, response: "User not found" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {

      return res
        .status(401)
        .json({ success: false, response: "Incorrect password" });
    }

    res.status(200).json({
      success: true,
      response: {
        username: user.username,
        id: user._id,
        accessToken: user.accessToken,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
});

// SUMMARY

// This file contains controller functions for user-related operations within an Express.js application. Let's provide a summary with additional context:

// registerUserController: This controller handles user registration. It extracts the user's username, password, and email from the request body. It performs several checks, such as ensuring that all required fields are provided and that the chosen username or email is not already in use by another user. It securely hashes the user's password using the bcrypt library and stores the hashed password in the database. After successfully registering the user, it responds with a success message, user details, and a JSON Web Token (JWT) for authentication.

// generateToken: This is a utility function used to generate JWT tokens for user authentication. It takes a user object and creates a token containing the user's access token, with an optional secret key and a 24-hour expiration time.

// loginUserController: This controller manages user login. It extracts the username and password from the request body, then attempts to find a user with the provided username in the database. If the user is found, it compares the provided password with the hashed password stored in the database using bcrypt. If the credentials match, it generates a JWT token for the user and responds with a success message, user details, and the JWT token. In case of authentication failure (wrong password or non-existent user), it responds with appropriate error messages.

// In summary, this file provides controllers for user registration and login, ensuring that user credentials are securely handled and authenticated using JWT tokens. It also uses bcrypt to hash and store passwords securely in the database, enhancing the overall security of user authentication in the application.
