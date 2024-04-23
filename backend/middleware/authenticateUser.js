import { UserModel } from "../models/UserModel";

export const authenticateUser = async (req, res, next) => {
  // Retrieve the access token from the request header
  const accessToken = req.header("Authorization");
  try {

    const user = await UserModel.findOne({ accessToken: accessToken });
    if (user) {
      // If a user is found, add the user object to the request object
      req.user = user; // Add user to the request object
      next(); // Continue to the next middleware or route
    } else {

      res.status(401).json({ success: false, response: "Please log in" });
    }
  } catch (e) {

    res.status(500).json({ success: false, response: e.message });
  }
};


