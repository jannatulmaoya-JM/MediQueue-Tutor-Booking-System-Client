
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Sun, Moon, Bars, Xmark } from '@gravity-ui/icons';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-emerald-600 dark:text-emerald-400 font-bold border-b-2 border-emerald-500 pb-1"
      : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors";

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-black bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            MediQueue
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/tutors" className={linkClass}>Tutors</NavLink>
            {user && <NavLink to="/add-tutor" className={linkClass}>Add Tutor</NavLink>}
            {user && <NavLink to="/my-tutors" className={linkClass}>My Tutors</NavLink>}
            {user && <NavLink to="/my-bookings" className={linkClass}>My Booked Sessions</NavLink>}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            
            {/* User Status (Sign Up / Login / Profile) */}
            {!user ? (
              <>
                <Link to="/register" className="px-3 py-2 border border-emerald-300 text-emerald-600 dark:text-emerald-400 dark:border-emerald-800 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-800 text-sm font-medium">
                  Sign Up
                </Link>
                <Link to="/login" className="px-3 py-2 text-white rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-medium">
                  Login
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center">
                  <img
                    src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border-2 border-emerald-400 object-cover"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2">
                    <p className="px-4 py-1 text-xs text-gray-400 truncate">{user.email}</p>
                    <hr className="my-1 border-gray-100 dark:border-gray-700" />
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile hamburger (টেক্সটের বদলে Gravity-UI আইকন ব্যবহার করা হয়েছে) */}
            <button
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <Xmark width="20" height="20" fill="currentColor" />
              ) : (
                <Bars width="20" height="20" fill="currentColor" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
            <NavLink to="/" className={linkClass} onClick={() => setMobileOpen(false)}>Home</NavLink>
            <NavLink to="/tutors" className={linkClass} onClick={() => setMobileOpen(false)}>Tutors</NavLink>
            {user && <NavLink to="/add-tutor" className={linkClass} onClick={() => setMobileOpen(false)}>Add Tutor</NavLink>}
            {user && <NavLink to="/my-tutors" className={linkClass} onClick={() => setMobileOpen(false)}>My Tutors</NavLink>}
            {user && <NavLink to="/my-bookings" className={linkClass} onClick={() => setMobileOpen(false)}>My Booked Sessions</NavLink>}
            {!user && (
              <>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 text-sm font-medium pt-1" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link to="/register" className="text-gray-600 dark:text-gray-300 text-sm font-medium pt-1" onClick={() => setMobileOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}
      </nav>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 z-50 p-3 h-12 w-12 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-2xl border border-gray-200/80 dark:border-gray-700 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center shrink-0"
        title="Toggle theme"
      >
        {darkMode ? (
          <Sun width="20" height="20" fill="currentColor" className="text-yellow-500" />
        ) : (
          <Moon width="20" height="20" fill="currentColor" className="text-gray-600" />
        )}
      </button>
    </>
  );
};

export default Navbar;