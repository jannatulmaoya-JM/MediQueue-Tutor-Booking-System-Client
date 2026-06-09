import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen flex flex-col justify-between font-sans">
        {/* অস্থায়ী নেভবার */}
        <header className="p-4 bg-teal-600 text-white font-bold text-center text-lg shadow-md">
          MediQueue Navbar (Coming Soon)
        </header>

        {/* মেইন কন্টেন্ট এরিয়া */}
        <main className="flex-grow flex items-center justify-center bg-gray-50 p-8 text-center">
          <div className="max-w-md p-6 bg-white rounded-2xl shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">MediQueue</h1>
            <p className="text-gray-600 font-medium">Welcome to Tutor Booking System!</p>
          </div>
        </main>

        {/* অস্থায়ী ফুটার */}
        <footer className="p-4 bg-gray-800 text-white text-center text-sm">
          © 2026 MediQueue. All rights reserved.
        </footer>
      </div>
    ),
  },
]);

export default router;