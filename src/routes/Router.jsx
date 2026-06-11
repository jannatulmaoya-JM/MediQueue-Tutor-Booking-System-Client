import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout"; // 👈 আপনার লেআউট ফাইল (নিচে বুঝিয়ে দিচ্ছি)
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ],
  },
]);

export default router;