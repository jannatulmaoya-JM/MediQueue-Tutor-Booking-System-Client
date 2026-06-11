import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Eye, EyeSlash } from '@gravity-ui/icons';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth'; // 👈 রিডাইরেক্ট মেথডগুলো ইমপোর্ট করা হলো
import { auth, googleProvider } from '../firebase/firebase.config'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  // 🔄 ইউজার গুগলে লগইন করে ফিরে আসার পর তার ডাটা রিসিভ করার জন্য এই এফেক্টটি লাগবে
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Logged In User Info via Redirect:", result.user);
          // সফলভাবে লগইন হলে হোম পেজে পাঠিয়ে দেবে
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Redirect Login Error:", error.message);
      });
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log({ email, password });
  };

  // 🔥 এই ফাংশনটি এখন পপআপের ঝামেলা ছাড়াই সরাসরি একই ট্যাবে গুগলে নিয়ে যাবে
  const handleGoogleLogin = () => {
    console.log("Redirecting to Google...");
    signInWithRedirect(auth, googleProvider); // 👈 এখানেও আমরা রিডাইরেক্ট মেথডটি বসিয়ে দিলাম
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-100">

        <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <p className="text-sm text-gray-500 text-center mb-8">
          Log in to manage your medical tutoring sessions
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-xs text-emerald-600 hover:text-cyan-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-emerald-600 transition focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeSlash width="18" height="18" /> : <Eye width="18" height="18" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-medium rounded-xl shadow-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 transition-all cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="mx-4 text-gray-400 text-xs uppercase">Or email</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        {/* 🌐 গুগল বাটন */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 active:scale-[0.98] font-medium text-gray-700 text-sm cursor-pointer select-none transition-all duration-150 shadow-sm"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.115-5.166 4.115-3.414 0-6.182-2.768-6.182-6.182s2.768-6.182 6.182-6.182c1.482 0 2.839.524 3.905 1.39l3.052-3.052C18.91 2.502 15.82 1.333 12.24 1.333 6.353 1.333 1.572 6.114 1.572 12s4.781 10.667 10.668 10.667c6.143 0 10.457-4.305 10.457-10.667 0-.714-.076-1.257-.21-1.714H12.24z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don't have an account yet?{" "}
          <Link to="/register" className="text-emerald-600 hover:text-cyan-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;