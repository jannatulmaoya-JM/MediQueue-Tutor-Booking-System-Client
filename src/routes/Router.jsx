import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tutors from "../pages/Tutors";
import TutorDetails from "../pages/TutorDetails";
import AddTutor from "../pages/AddTutor";
import MyTutors from "../pages/MyTutors";
import MyBookings from "../pages/MyBookings";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titleMap = {
  "/": "Home | MediQueue",
  "/tutors": "Find Tutors | MediQueue",
  "/add-tutor": "Add Tutor | MediQueue",
  "/my-tutors": "My Tutors | MediQueue",
  "/my-bookings": "My Bookings | MediQueue",
  "/login": "Login | MediQueue",
  "/register": "Register | MediQueue",
};

const DynamicTitle = () => {
  const location = useLocation();
  useEffect(() => {
    const title = titleMap[location.pathname] || "MediQueue";
    document.title = title;
  }, [location.pathname]);
  return null;
};

const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans">
    <DynamicTitle />
    <Navbar />
    <main className="flex-grow flex flex-col">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/tutors", element: <Tutors /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/tutor/:id",
        element: <PrivateRoute><TutorDetails /></PrivateRoute>,
      },
      {
        path: "/add-tutor",
        element: <PrivateRoute><AddTutor /></PrivateRoute>,
      },
      {
        path: "/my-tutors",
        element: <PrivateRoute><MyTutors /></PrivateRoute>,
      },
      {
        path: "/my-bookings",
        element: <PrivateRoute><MyBookings /></PrivateRoute>,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;