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

// SUMMARY

//In this code, we have a function called authenticateUser that is used as middleware in a Node.js application. This middleware is responsible for checking the authorization header of an incoming request, searching for a user with the provided access token in the database using the UserModel, and adding the user object to the request if found. If no user is found or if there are any errors during the process, appropriate responses are sent back to the client. In summary, this code is handling user authentication by checking the access token in the request header and verifying it against the database to grant access to protected routes or endpoints.
