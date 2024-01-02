// Import the 'Route' component from the 'react-router-dom' library.
import { Route } from "react-router-dom";
// Import various page components used as route elements.
import Home from "../pages/Home";
import Contact from "../pages/Contact"
// import NotFound from "../pages/NotFound";

// Define the 'routes' variable as a JSX expression.
const routes = (
  <>

    {/* Define a route for the '/home' path that renders the 'Home' component. */}
    <Route path="/home" element={<Home />} />
    <Route path="/contact" element={<Contact />} />

    {/* Define a route for the '/tasks' path that renders the 'Tasks' component. */}
    {/* <Route path="*" element={<NotFound />} /> */}
  </>
);

// Export the 'routes' variable as the default export of this module.
export default routes;

// SUMMARY

// This file sets up routing for a React application using React Router. It imports the necessary components and defines routes for different URL paths, associating each path with a specific component to be rendered when that path is accessed. The catch-all route with the path "*" is used to handle routes that do not match any of the specified paths, rendering the "NotFound" component in such cases.
