import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* ইনফো সেকশন */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">MediQueue</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting medical students with expert tutors smoothly and efficiently.
            </p>
          </div>

          {/* কুইক লিঙ্কস */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-white font-semibold mb-1">Quick Links</h4>
            <Link to="/" className="text-sm hover:text-teal-400 transition">Home</Link>
            <Link to="/tutors" className="text-sm hover:text-teal-400 transition">Find Tutors</Link>
          </div>

          {/* কপিরাইট ও সোশ্যাল */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-white font-semibold mb-2">Contact Support</h4>
              <p className="text-sm text-gray-400">support@mediqueue.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} MediQueue Tutor Booking System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;