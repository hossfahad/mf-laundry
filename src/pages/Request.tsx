
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Clock, Phone, MessageSquare } from 'lucide-react';

const Request = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Astoria',
    zipCode: '',
    date: '',
    time: '',
    serviceType: 'wash-fold',
    notes: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, we would send this to a server
    // For now we'll simulate a request and store in localStorage
    setTimeout(() => {
      // Create a unique ID
      const requestId = Date.now().toString();
      const newRequest = {
        id: requestId,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Get existing requests or initialize empty array
      const existingRequests = JSON.parse(localStorage.getItem('laundryRequests') || '[]');
      existingRequests.push(newRequest);
      localStorage.setItem('laundryRequests', JSON.stringify(existingRequests));
      
      setIsSubmitting(false);
      toast({
        title: "Request Submitted Successfully",
        description: "We'll contact you shortly to confirm your pickup."
      });
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: 'Astoria',
        zipCode: '',
        date: '',
        time: '',
        serviceType: 'wash-fold',
        notes: '',
      });
      
      navigate('/request/confirmation', { state: { requestId } });
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-laundry-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Request Pickup & Delivery</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Free pickup and delivery service for your convenience
            </p>
          </div>
        </section>
        
        {/* Request Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-laundry-lightGray p-6 rounded-lg mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  <Phone size={20} className="text-laundry-blue" />
                  <p className="font-medium">Prefer to request by phone?</p>
                </div>
                <p>Call us at <span className="font-medium">929-346-8509</span> to schedule your pickup</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold mb-6">Schedule a Pickup</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                      placeholder="Your email address (optional)"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                      placeholder="Your street address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Preferred Date</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">
                          <Calendar size={18} />
                        </span>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-gray-700 font-medium mb-2">Preferred Time</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">
                          <Clock size={18} />
                        </span>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                        >
                          <option value="">Select a time</option>
                          <option value="7:00 AM - 9:00 AM">7:00 AM - 9:00 AM</option>
                          <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                          <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                          <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                          <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                          <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                          <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="serviceType" className="block text-gray-700 font-medium mb-2">Service Type</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                    >
                      <option value="wash-fold">Wash & Fold</option>
                      <option value="dry-cleaning">Dry Cleaning</option>
                      <option value="both">Both Services</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare size={18} className="text-laundry-blue" />
                        <span>Special Instructions (Optional)</span>
                      </div>
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                      placeholder="Any special instructions or notes for your pickup"
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn-primary w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Schedule Pickup'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Request;
