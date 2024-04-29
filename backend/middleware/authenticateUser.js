// import { UserModel } from "../models/UserModel";

// export const authenticateUser = async (req, res, next) => {
//   // Retrieve the access token from the request header
//   const accessToken = req.header("Authorization");
//   try {

//     const user = await UserModel.findOne({ accessToken: accessToken });
//     if (user) {
//       // If a user is found, add the user object to the request object
//       req.user = user; // Add user to the request object
//       next(); // Continue to the next middleware or route
//     } else {

//       res.status(401).json({ success: false, response: "Please log in" });
//     }
//   } catch (e) {

//     res.status(500).json({ success: false, response: e.message });
//   }
// };

import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  // Retrieve the access token from the request header and remove the "Bearer " prefix if present
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, response: "No token provided, please log in" });
  }

  const token = authHeader.split(' ')[1]; // Get the token from the header

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user using the ID decoded from the token
    const user = await UserModel.findById(decoded.id).select("-password"); // Exclude password from user data
    if (!user) {
      return res.status(404).json({ success: false, response: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error(`JWT Error: ${error.message}`);
    res.status(401).json({ success: false, response: "Invalid token, please log in again" });
  }
};



