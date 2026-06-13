import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 dark:bg-gray-900">
    <p className="text-9xl font-black text-gray-100 dark:text-gray-800">404</p>
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white -mt-8 mb-4">Page Not Found</h2>
    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
      Looks like the page you're looking for doesn't exist or has been moved.
    </p>
    <Link to="/" className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow hover:opacity-90">
      Back to Home
    </Link>
  </div>
);

export default NotFound;