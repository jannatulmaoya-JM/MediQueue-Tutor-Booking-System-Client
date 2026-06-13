import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tutors from "./pages/Tutors";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      {/* Main content */}
      <main className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-gray-900">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Tutors Page */}
          <Route path="/tutors" element={<Tutors />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 404 fallback route */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-red-500">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-500 mt-2">
                  The page you are looking for does not exist.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;