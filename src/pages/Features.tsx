import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package, PackageOpen, Truck, Calendar, Clock, User } from 'lucide-react';

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-laundry-blue text-white py-16">
          <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <img src="/pexels-polina-tankilevitch-4440572.jpg" alt="Laundry service" className="rounded-xl shadow-lg w-full max-w-md mb-8" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl max-w-2xl mx-auto">
              We offer a comprehensive range of laundry services to meet all your needs
            </p>
          </div>
        </section>
        
        {/* Main Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Main Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="service-card flex">
                <div className="mr-6">
                  <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center">
                    <Package className="text-laundry-blue" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Wash, Dry, Fold & Drop Off</h3>
                  <p className="text-gray-600 mb-4">
                    Drop off your laundry with us and we'll take care of washing, drying, and folding it. Your clothes will be ready for pickup at your convenience.
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Professional handling of all garment types</li>
                    <li>Sorted by color and fabric type</li>
                    <li>Neatly folded and packaged</li>
                  </ul>
                </div>
              </div>
              
              <div className="service-card flex">
                <div className="mr-6">
                  <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center">
                    <User className="text-laundry-blue" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Self Service</h3>
                  <p className="text-gray-600 mb-4">
                    Use our modern, well-maintained machines at affordable rates. Our facility offers a clean and comfortable environment.
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>High-capacity washers and dryers</li>
                    <li>Detergent and fabric softener available for purchase</li>
                    <li>Clean and comfortable waiting area</li>
                  </ul>
                </div>
              </div>
              
              <div className="service-card flex">
                <div className="mr-6">
                  <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center">
                    <PackageOpen className="text-laundry-blue" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Dry Cleaning</h3>
                  <p className="text-gray-600 mb-4">
                    Professional dry cleaning for your delicate garments, suits, dresses, and other items that require special care.
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Gentle cleaning of delicate fabrics</li>
                    <li>Stain removal expertise</li>
                    <li>Professional pressing</li>
                  </ul>
                </div>
              </div>
              
              <div className="service-card flex">
                <div className="mr-6">
                  <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center">
                    <Truck className="text-laundry-blue" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Free Delivery and Pick Up</h3>
                  <p className="text-gray-600 mb-4">
                    We offer complimentary pickup and delivery services to make laundry day even more convenient for you.
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Schedule via phone or our website</li>
                    <li>Flexible timing to fit your schedule</li>
                    <li>No minimum order required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional Services Section */}
        <section className="py-16 bg-laundry-lightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Alterations and Tailoring</h3>
                <p className="text-gray-600 mb-4">
                  Our professional tailors can handle a wide range of alterations to ensure your garments fit perfectly.
                </p>
                <ul className="text-gray-600 list-disc list-inside space-y-2">
                  <li>Hem adjustments</li>
                  <li>Size alterations</li>
                  <li>Repairs and mending</li>
                  <li>Button replacement</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Clean and Big Space</h3>
                <p className="text-gray-600 mb-4">
                  Our laundromat features clean, spacious facilities with modern amenities for your comfort.
                </p>
                <ul className="text-gray-600 list-disc list-inside space-y-2">
                  <li>Comfortable seating area</li>
                  <li>Free Wi-Fi</li>
                  <li>Well-lit, clean environment</li>
                  <li>TV and magazines available</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold mb-6">Why Choose M.F Laundromat?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-laundry-blue" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Time-Saving</h4>
                  <p className="text-gray-600">Let us handle your laundry while you focus on what matters.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="text-laundry-blue" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Quality Care</h4>
                  <p className="text-gray-600">Professional treatment for all your garments.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="text-laundry-blue" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Convenience</h4>
                  <p className="text-gray-600">Open 7 days a week with pickup and delivery.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-laundry-lightBlue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="text-laundry-blue" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Personalized Service</h4>
                  <p className="text-gray-600">We care about your specific needs and preferences.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
