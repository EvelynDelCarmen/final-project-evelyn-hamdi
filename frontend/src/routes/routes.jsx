
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import ImageGallery from "../components/ImageGallery";
import About from "../pages/About";
import { Login } from "../pages/Login";
import { Welcome } from "../pages/Welcome";
import { NotFound } from "../pages/NotFound";


const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/gallery/:folderName" element={<ImageGallery />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login />} />
    <Route path="/welcome" element={<Welcome />} />
    <Route path="*" element={<NotFound />} />
  </>
);


export default routes;