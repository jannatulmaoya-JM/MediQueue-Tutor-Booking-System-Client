import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;