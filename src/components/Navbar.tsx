
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-laundry-blue">M.F Laundromat</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-laundry-blue"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-laundry-blue font-medium">Home</Link>
          <Link to="/features" className="text-gray-700 hover:text-laundry-blue font-medium">Services</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-laundry-blue font-medium">Pricing</Link>
          <Link to="/request" className="text-gray-700 hover:text-laundry-blue font-medium">Request Pickup</Link>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-white shadow-md z-10">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <Link to="/" className="text-gray-700 hover:text-laundry-blue font-medium" onClick={toggleMenu}>Home</Link>
              <Link to="/features" className="text-gray-700 hover:text-laundry-blue font-medium" onClick={toggleMenu}>Services</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-laundry-blue font-medium" onClick={toggleMenu}>Pricing</Link>
              <Link to="/request" className="text-gray-700 hover:text-laundry-blue font-medium" onClick={toggleMenu}>Request Pickup</Link>
              <Link to="/admin" className="text-gray-700 hover:text-laundry-blue font-medium" onClick={toggleMenu}>Admin</Link>
            </div>
          </div>
        )}
        
        {/* Admin link - only visible on desktop */}
        <div className="hidden md:flex">
          <Link to="/admin" className="text-sm text-gray-500 hover:text-laundry-blue">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
