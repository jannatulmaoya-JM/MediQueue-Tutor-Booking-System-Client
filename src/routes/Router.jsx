import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
  return (
 <div className="min-h-screen flex flex-col justify-between bg-gray-50 font-sans">
    <Navbar/>
    <main className="flex-grow flex flex-col">
        <Outlet/>
    </main>

   <Footer/>
 </div>
 
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default router;