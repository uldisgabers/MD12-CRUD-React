import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home"
import Cars from "../pages/Cars/Cars"
import About from "../pages/About/About";
// import About from "../pages/About/About"
import NotFound from "../pages/NotFound/NotFound"
import CarPage from "../pages/CarPage/CarPage";

const RouterProvider = () => {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car/:id" element={<CarPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};

export default RouterProvider;