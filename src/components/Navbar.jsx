// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = (
//     <>
//       <NavLink 
//         to="/" 
//         className={({ isActive }) => 
//           isActive ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1" : "text-gray-600 hover:text-teal-600 transition font-medium"
//         }
//       >
//         Home
//       </NavLink>
//       <NavLink 
//         to="/tutors" 
//         className={({ isActive }) => 
//           isActive ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1" : "text-gray-600 hover:text-teal-600 transition font-medium"
//         }
//       >
//         Find Tutors
//       </NavLink>
//       <NavLink 
//         to="/reviews" 
//         className={({ isActive }) => 
//           isActive ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1" : "text-gray-600 hover:text-teal-600 transition font-medium"
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

//           <div className="flex-shrink-0 flex items-center">
//             <Link to="/" className="text-2xl font-black text-teal-600 tracking-tight">
//               MediQueue
//             </Link>
//           </div>

//           <div className="hidden md:flex space-x-8">
//             {navLinks}
//           </div>

//           <div className="hidden md:flex items-center">
//             <Link to="/login" className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-sm transition-all duration-200 text-sm">
//               Login
//             </Link>
//           </div>

//           <div className="flex md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-600 hover:text-teal-600 focus:outline-none p-2 rounded-lg hover:bg-gray-55"
//             >
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 {isOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

    
//       {isOpen && (
//         <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-3 flex flex-col shadow-inner">
//           {navLinks}
//           <Link 
//             to="/login" 
//             onClick={() => setIsOpen(false)}
//             className="w-full text-center px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition text-sm"
//           >
//             Login
//           </Link>
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
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive 
            ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1 text-sm md:text-base" 
            : "text-gray-600 hover:text-teal-600 transition font-medium text-sm md:text-base"
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/tutors" 
        className={({ isActive }) => 
          isActive 
            ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1 text-sm md:text-base" 
            : "text-gray-600 hover:text-teal-600 transition font-medium text-sm md:text-base"
        }
      >
        Find Tutors
      </NavLink>
      <NavLink 
        to="/reviews" 
        className={({ isActive }) => 
          isActive 
            ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1 text-sm md:text-base" 
            : "text-gray-600 hover:text-teal-600 transition font-medium text-sm md:text-base"
        }
      >
        Add Review
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
   
          <div className="flex items-center space-x-2">
     
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-teal-600 focus:outline-none p-1.5 rounded-lg hover:bg-gray-50 transition"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl md:text-2xl font-black text-teal-600 tracking-tight">
                MediQueue
              </Link>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks}
          </div>

         <div className="flex items-center">
            <Link 
              to="/login" 
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-sm transition-all duration-200 text-xs md:text-sm"
            >
              Login
            </Link>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col space-y-4 shadow-md transition-all">
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;