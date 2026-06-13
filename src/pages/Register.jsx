// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Eye, EyeSlash } from '@gravity-ui/icons';

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const handleRegister = (e) => {
//     e.preventDefault();
//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const photoURL = e.target.photoURL.value;
//     const password = e.target.password.value;
    
//     console.log({ name, email, photoURL, password });
//   };

//   return (
//     <div className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50">
//       <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//         <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
//           Create Account
//         </h2>
//         <p className="text-sm text-gray-500 text-center mb-8">Join MediQueue to book professional medical tutors</p>

//         <form onSubmit={handleRegister} className="space-y-5">
 
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input 
//               type="text" 
//               name="name" 
//               required
//               placeholder="John Doe" 
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//             <input 
//               type="email" 
//               name="email" 
//               required
//               placeholder="you@example.com" 
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition"
//             />
//           </div>

// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//     Photo URL <span className="text-gray-400 font-normal text-xs">(Optional)</span>
//   </label>
//   <input 
//     type="url" 
//     name="photoURL" 
//     placeholder="https://example.com/avatar.jpg" 
//     className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition"
  
//   />
// </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <div className="relative flex items-center">
//               <input 
//                 type={showPassword ? "text" : "password"} 
//                 name="password" 
//                 required
//                 placeholder="••••••••" 
//                 className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3.5 text-gray-400 hover:text-teal-600 transition focus:outline-none"
//               >
//                 {showPassword ? <EyeSlash width="18" height="18" /> : <Eye width="18" height="18" />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 text-white font-medium rounded-xl shadow-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="text-sm text-gray-600 text-center mt-6">
//           Already have an account?{' '}
//           <Link to="/login" className="text-teal-600 font-semibold hover:underline">Login here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, googleLogin, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "Password must have at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must have at least one lowercase letter.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      await updateUserProfile(name, photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png");
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Signed in with Google!");
      navigate("/");
    } catch {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
          Join MediQueue to book professional tutors
        </p>

        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input type="text" name="name" required placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-teal-500 text-sm bg-white dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input type="email" name="email" required placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-teal-500 text-sm bg-white dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Photo URL <span className="text-gray-400 text-xs font-normal">(Optional)</span>
            </label>
            <input type="url" name="photoURL" placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-teal-500 text-sm bg-white dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div className="relative flex items-center">
              <input type={showPassword ? "text" : "password"} name="password" required placeholder="••••••••"
                className="w-full px-4 py-2.5 pr-11 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-teal-500 text-sm bg-white dark:bg-gray-700 dark:text-white" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-teal-600 transition focus:outline-none">
                {showPassword ? <EyeSlash width="18" height="18" /> : <Eye width="18" height="18" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 text-white font-medium rounded-xl shadow-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 transition disabled:opacity-60">
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-100 dark:border-gray-600"></div>
          <span className="mx-4 text-gray-400 text-xs uppercase">or</span>
          <div className="flex-grow border-t border-gray-100 dark:border-gray-600"></div>
        </div>

        <button onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium dark:text-white">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.115-5.166 4.115-3.414 0-6.182-2.768-6.182-6.182s2.768-6.182 6.182-6.182c1.482 0 2.839.524 3.905 1.39l3.052-3.052C18.91 2.502 15.82 1.333 12.24 1.333 6.353 1.333 1.572 6.114 1.572 12s4.781 10.667 10.668 10.667c6.143 0 10.457-4.305 10.457-10.667 0-.714-.076-1.257-.21-1.714H12.24z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 font-semibold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;