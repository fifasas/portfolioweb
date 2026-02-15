import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GravityStars from '../components/GravityStars';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen text-white flex flex-col font-sans selection:bg-primary selection:text-white relative bg-transparent">
      <Navbar />
      <main className="flex-grow pt-20 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;