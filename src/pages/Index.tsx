import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, Clock, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-laundry-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Laundry Services in Astoria</h1>
                <p className="text-xl mb-8">Short on time? Let us do your laundry!</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/request" className="bg-white text-laundry-blue hover:bg-laundry-lightBlue px-6 py-3 rounded-md font-medium transition-all duration-300">
                    Request Pickup
                  </Link>
                  <Link to="/features" className="bg-transparent border border-white text-white hover:bg-white hover:text-laundry-blue px-6 py-3 rounded-md font-medium transition-all duration-300">
                    Our Services
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 relative flex flex-col items-center min-h-[420px]">
                {/* Large, creatively positioned image */}
                <img
                  src="/pexels-ekaterinabelinskaya-4700383.jpg"
                  alt="Modern laundry scene"
                  className="rounded-3xl shadow-2xl w-[390px] md:w-[480px] lg:w-[540px] xl:w-[600px] absolute -top-10 left-1/2 -translate-x-1/2 z-10 rotate-2 border-4 border-white"
                  style={{ boxShadow: '0 12px 40px 0 rgba(30,40,80,0.25)' }}
                />
                {/* Overlapping smaller image */}
                <img
                  src="/pexels-chikawaztla-31902663.jpg"
                  alt="Laundry baskets"
                  className="rounded-xl shadow-lg w-[180px] md:w-[220px] absolute bottom-0 right-2 z-20 border-2 border-white rotate-[-4deg]"
                  style={{ boxShadow: '0 8px 24px 0 rgba(30,40,80,0.12)' }}
                />
                <div className="relative z-30 mt-[260px] w-full max-w-md">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-laundry-blue text-2xl font-bold mb-4">Hours & Location</h2>
                    <div className="flex items-start space-x-3 mb-3">
                      <Clock className="text-laundry-blue mt-1" />
                      <div>
                        <p className="text-gray-800 font-medium">Open Every Day</p>
                        <p className="text-gray-600">7:00AM - 10:00PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 mb-3">
                      <Phone className="text-laundry-blue mt-1" />
                      <div>
                        <p className="text-gray-800 font-medium">Phone Number</p>
                        <p className="text-gray-600">929-346-8509</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-800 font-medium">Address:</p>
                      <p className="text-gray-600">21-15 21st Ave 11105, Astoria, New York</p>
                    </div>
                    <p className="text-laundry-blue font-medium">Se habla Español</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="service-card text-center">
                <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-laundry-blue" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Wash, Dry & Fold</h3>
                <p className="text-gray-600">Drop off your laundry and pick it up clean, dry, and neatly folded.</p>
              </div>
              
              <div className="service-card text-center">
                <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-laundry-blue" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Self Service</h3>
                <p className="text-gray-600">Use our modern machines and amenities at affordable rates.</p>
              </div>
              
              <div className="service-card text-center">
                <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-laundry-blue" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Dry Cleaning</h3>
                <p className="text-gray-600">Professional dry cleaning for your delicate garments.</p>
              </div>
              
              <div className="service-card text-center">
                <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="text-laundry-blue" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Free Pickup & Delivery</h3>
                <p className="text-gray-600">We'll pick up and deliver your laundry for free.</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/features" className="btn-primary">
                View All Services
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-laundry-lightGray">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to save time?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Let us handle your laundry while you focus on what matters most to you.</p>
            <Link to="/request" className="btn-primary">
              Request Pickup Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
