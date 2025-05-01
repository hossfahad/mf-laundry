
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, Check } from 'lucide-react';

const RequestConfirmation = () => {
  const location = useLocation();
  const requestId = location.state?.requestId || "Unknown";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
              <p className="text-xl text-gray-700 mb-6">Your pickup request has been submitted successfully.</p>
              
              <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 mb-8">
                <h2 className="text-xl font-bold text-laundry-blue mb-4">What Happens Next?</h2>
                <p className="text-gray-600 mb-4">
                  We'll contact you shortly to confirm your pickup time. You'll receive a text message with the confirmation.
                </p>
                
                <div className="text-left bg-laundry-lightGray p-4 rounded-lg">
                  <p className="font-medium mb-2">Your request details:</p>
                  <p className="mb-1"><span className="font-medium">Request ID:</span> {requestId}</p>
                  <p><span className="font-medium">Status:</span> <span className="text-orange-500">Pending Confirmation</span></p>
                </div>
              </div>
              
              <div className="bg-laundry-lightBlue p-6 rounded-lg inline-flex items-center space-x-3">
                <Phone size={24} className="text-laundry-blue" />
                <div className="text-left">
                  <p>Have questions? Call us at:</p>
                  <p className="font-bold text-lg">929-346-8509</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/" className="btn-primary">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RequestConfirmation;
