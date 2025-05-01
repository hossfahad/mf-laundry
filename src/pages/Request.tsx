
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Clock, Phone, MessageSquare } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Map form data to database columns
      const requestData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null, // Handle empty email
        address: formData.address,
        city: formData.city,
        zip_code: formData.zipCode,
        date: formData.date,
        time: formData.time,
        service_type: formData.serviceType,
        notes: formData.notes || null, // Handle empty notes
        status: 'pending'
      };
      
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('laundry_requests')
        .insert(requestData)
        .select('id')
        .single();
        
      if (error) {
        console.error('Error submitting request:', error);
        toast({
          title: "Submission Error",
          description: "There was a problem submitting your request. Please try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
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
      
      setIsSubmitting(false);
      navigate('/request/confirmation', { state: { requestId: data?.id } });
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-laundry-blue to-blue-500 text-white py-16 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-blue-500 opacity-10 blur-2xl"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-normal mb-4 font-['Inter']">Request Pickup & Delivery</h1>
            <p className="text-xl max-w-2xl mx-auto font-['Open_Sans'] font-light">
              Free pickup and delivery service for your convenience
            </p>
          </div>
        </section>
        
        {/* Request Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl mb-8 border border-white/60 shadow-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Phone size={20} className="text-laundry-blue" />
                  <p className="font-['Inter'] font-normal">Prefer to request by phone?</p>
                </div>
                <p className="font-['Open_Sans'] font-light">Call or text us at <span className="font-normal">929-346-8509</span> to schedule your pickup</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 border border-white/60">
                <h2 className="text-2xl font-normal mb-6 text-center font-['Inter']">Schedule a Pickup</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-normal mb-2 font-['Inter']">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-normal mb-2 font-['Inter']">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 font-normal mb-2 font-['Inter']">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                      placeholder="Your email address (optional)"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="address" className="block text-gray-700 font-normal mb-2 font-['Inter']">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                      placeholder="Your street address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 font-normal mb-2 font-['Inter']">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-700 font-normal mb-2 font-['Inter']">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="date" className="block text-gray-700 font-normal mb-2 font-['Inter']">Preferred Date</label>
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
                          className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-gray-700 font-normal mb-2 font-['Inter']">Preferred Time</label>
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
                          className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
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
                    <label htmlFor="serviceType" className="block text-gray-700 font-normal mb-2 font-['Inter']">Service Type</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                    >
                      <option value="wash-fold">Wash & Fold</option>
                      <option value="dry-cleaning">Dry Cleaning</option>
                      <option value="both">Both Services</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="notes" className="block text-gray-700 font-normal mb-2 font-['Inter']">
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
                      className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                      placeholder="Any special instructions or notes for your pickup"
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-laundry-blue bg-opacity-90 backdrop-blur-sm text-white hover:bg-laundry-darkBlue px-6 py-3 rounded-lg font-['Inter'] font-normal transition-all duration-300 shadow-md hover:shadow-lg"
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
