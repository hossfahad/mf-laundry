
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-laundry-lightGray py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">M.F Laundromat</h3>
            <p className="text-gray-600 mb-4">Quality laundry services in Astoria. We offer wash, dry, fold, dry cleaning, alterations and more.</p>
            <p className="text-gray-600 font-medium">Se habla Español</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="flex items-start space-x-2 mb-3">
              <MapPin size={18} className="text-laundry-blue mt-1" />
              <p className="text-gray-600">21-15 21st Ave 11105, Astoria, New York</p>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <Phone size={18} className="text-laundry-blue" />
              <p className="text-gray-600">929-346-8509</p>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={18} className="text-laundry-blue" />
              <p className="text-gray-600">7:00AM - 10:00PM (Open Every Day)</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-laundry-blue">Home</Link></li>
              <li><Link to="/features" className="text-gray-600 hover:text-laundry-blue">Services</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-laundry-blue">Pricing</Link></li>
              <li><Link to="/request" className="text-gray-600 hover:text-laundry-blue">Request Pickup</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600">© 2025 M.F Laundromat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
