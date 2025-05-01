
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, Check } from 'lucide-react';

const RequestConfirmation = () => {
  const location = useLocation();
  const requestId = location.state?.requestId || "Unknown";
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Check size={40} className="text-green-600" />
              </div>
              
              <h1 className="text-3xl font-normal mb-4 font-['Inter']">Thank You!</h1>
              <p className="text-xl text-gray-700 mb-6 font-['Open_Sans'] font-light">Your pickup request has been submitted successfully.</p>
              
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 border border-white/60 mb-8 text-left">
                <h2 className="text-xl font-normal text-laundry-blue mb-4 font-['Inter']">What Happens Next?</h2>
                <p className="text-gray-600 mb-6 font-['Open_Sans'] font-light">
                  We'll contact you shortly to confirm your pickup time. You'll receive a text message with the confirmation.
                </p>
                
                <div className="bg-gray-50/70 backdrop-blur-sm p-5 rounded-lg border border-gray-100">
                  <p className="font-['Inter'] font-normal mb-2">Your request details:</p>
                  <p className="mb-2 font-['Open_Sans'] font-light"><span className="font-normal">Request ID:</span> {requestId}</p>
                  <p className="font-['Open_Sans'] font-light"><span className="font-normal">Status:</span> <span className="text-orange-500">Pending Confirmation</span></p>
                </div>
              </div>
              
              <div className="bg-laundry-lightBlue/70 backdrop-blur-sm p-6 rounded-lg inline-flex items-center space-x-3 shadow-md border border-laundry-blue/20">
                <Phone size={24} className="text-laundry-blue" />
                <div className="text-left">
                  <p className="font-['Open_Sans'] font-light">Have questions? Call us at:</p>
                  <p className="font-['Inter'] font-normal text-lg">929-346-8509</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/" className="bg-laundry-blue bg-opacity-90 backdrop-blur-sm text-white hover:bg-laundry-darkBlue px-6 py-3 rounded-lg font-['Inter'] font-normal transition-all duration-300 shadow-md hover:shadow-lg">
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
