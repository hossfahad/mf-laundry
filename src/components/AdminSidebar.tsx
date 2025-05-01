
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, ArrowLeft } from 'lucide-react';

interface AdminSidebarProps {
  activePage: string;
  onLogout: () => void;
}

const AdminSidebar = ({ activePage, onLogout }: AdminSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-laundry-lightBlue text-laundry-blue' : 'text-gray-600 hover:bg-gray-100/70';
  };
  
  return (
    <div className="w-full md:w-64 bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 border border-white/60 h-fit">
      <div className="mb-6">
        <h2 className="text-xl font-normal text-gray-800 font-['Inter']">Admin Dashboard</h2>
        <p className="text-gray-500 text-sm font-['Open_Sans'] font-light">Manage pickup & dropoff requests</p>
      </div>
      
      <nav className="space-y-2">
        <Link
          to="/admin"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isActive('/admin')} font-['Inter'] font-normal`}
        >
          <Package size={18} />
          <span>Requests</span>
        </Link>
      </nav>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 text-gray-600 hover:text-laundry-blue font-['Inter'] font-normal"
        >
          <ArrowLeft size={18} />
          <span>Logout</span>
        </button>
        
        <Link
          to="/"
          className="mt-4 flex items-center space-x-2 text-gray-600 hover:text-laundry-blue font-['Inter'] font-normal"
        >
          <span>← Back to website</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
