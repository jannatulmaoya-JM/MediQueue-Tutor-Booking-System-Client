// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // মেনু লিঙ্কগুলোর কমন লিস্ট
//   const navLinks = (
//     <>
//       <NavLink 
//         to="/" 
//         className={({ isActive }) => 
//           isActive 
//             ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1 text-sm md:text-base" 
//             : "text-gray-600 hover:text-teal-600 transition font-medium text-sm md:text-base"
//         }
//       >
//         Home
//       </NavLink>
//       <NavLink 
//         to="/tutors" 
//         className={({ isActive }) => 
//           isActive 
//             ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1 text-sm md:text-base" 
//             : "text-gray-600 hover:text-teal-600 transition font-medium text-sm md:text-base"
//         }
//       >
//         Find Tutors
//       </NavLink>
//       <NavLink 
//         to="/reviews" 
//         className={({ isActive }) => 
//           isActive 
//             ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1 text-sm md:text-base" 
//             : "text-gray-600 hover:text-teal-600 transition font-medium text-sm md:text-base"
//         }
//       >
//         Add Review
//       </NavLink>
//     </>
//   );

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
          
//           {/* 📱 মোবাইল ভিউতে মেনু বাটন ও লোগো */}
//           <div className="flex items-center space-x-2">
//             {/* মোবাইল মেনু টগল বাটন */}
//             <div className="flex md:hidden">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-gray-600 hover:text-teal-600 focus:outline-none p-1.5 rounded-lg hover:bg-gray-55 transition"
//               >
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   {isOpen ? (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   ) : (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                   )}
//                 </svg>
//               </button>
//             </div>

//             {/* লোগো */}
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/" className="text-xl md:text-2xl font-black text-teal-600 tracking-tight">
//                 MediQueue
//               </Link>
//             </div>
//           </div>

//           {/* 💻 ডেক্সটপ মেনু লিঙ্ক (শুধু বড় স্ক্রিনে দেখাবে) */}
//           <div className="hidden md:flex space-x-8">
//             {navLinks}
//           </div>

//           {/* 🔐 লগইন এবং সাইন-আপ বাটন (সব ডিভাইসে পাশাপাশি সুন্দরভাবে দেখাবে) */}
//           <div className="flex items-center space-x-2 md:space-x-3">
//             {/* লগইন বাটন */}
//             <Link 
//               to="/login" 
//              className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-sm shadow-teal-600/10 transition-all duration-200 text-xs md:text-sm"
//             >
//               Login
//             </Link>

//             {/* রেজিস্টার/সাইন-আপ বাটন */}
//             <Link   
//               to="/register" 
             

//                className="px-3 py-2 text-teal-600 hover:bg-teal-50 border border-teal-600/30 font-semibold rounded-xl transition-all duration-200 text-xs md:text-sm"
//             >
//               Sign Up
//             </Link>
//           </div>

//         </div>
//       </div>

//       {/* 📱 মোবাইল ড্রপডাউন মেনু */}
//       {isOpen && (
//         <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col space-y-4 shadow-md transition-all">
//           {navLinks}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) =>
        isActive ? "text-emerald-600 font-bold border-b-2 border-emerald-500 pb-1" :
        "text-gray-600 hover:text-emerald-600"
      }>
        Home
      </NavLink>

      <NavLink to="/tutors" className={({ isActive }) =>
        isActive ? "text-emerald-600 font-bold border-b-2 border-emerald-500 pb-1" :
        "text-gray-600 hover:text-emerald-600"
      }>
        Find Tutors
      </NavLink>

      <NavLink to="/reviews" className={({ isActive }) =>
        isActive ? "text-emerald-600 font-bold border-b-2 border-emerald-500 pb-1" :
        "text-gray-600 hover:text-emerald-600"
      }>
        Add Review
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">

        <Link className="text-xl font-black bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
          MediQueue
        </Link>

        <div className="hidden md:flex space-x-6">{navLinks}</div>

        <div className="flex items-center gap-2">


           <Link to="/register"
            className="px-3 py-2 border border-emerald-300 text-emerald-600 rounded-xl hover:bg-emerald-50">
            Sign Up
          </Link>

          <Link to="/login"
            className="px-3 py-2 text-white rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500">
            Login
          </Link>

         

        </div>

      </div>

      {isOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-3">
          {navLinks}
        </div>
      )}

    </nav>
  );
};

export default Navbar;