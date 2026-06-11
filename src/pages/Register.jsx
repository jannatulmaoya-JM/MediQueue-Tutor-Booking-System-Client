import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeSlash } from '@gravity-ui/icons';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;
    
    console.log({ name, email, photoURL, password });
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">Join MediQueue to book professional medical tutors</p>

        <form onSubmit={handleRegister} className="space-y-5">
 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              required
              placeholder="John Doe" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required
              placeholder="you@example.com" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition"
            />
          </div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Photo URL <span className="text-gray-400 font-normal text-xs">(Optional)</span>
  </label>
  <input 
    type="url" 
    name="photoURL" 
    placeholder="https://example.com/avatar.jpg" 
    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition"
  
  />
</div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative flex items-center">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                required
                placeholder="••••••••" 
                className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-teal-600 transition focus:outline-none"
              >
                {showPassword ? <EyeSlash width="18" height="18" /> : <Eye width="18" height="18" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-medium rounded-xl shadow-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 font-semibold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;