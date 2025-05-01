
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface LaundryRequest {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  zip_code: string;
  date: string;
  time: string;
  service_type: string;
  notes: string | null;
  status: string;
  created_at: string;
}

const AdminEditRequest = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isNewRequest = !id || id === 'new';
  
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
    status: 'pending'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('laundryAdminAuth');
    if (auth !== 'true') {
      navigate('/admin');
      return;
    }
    
    if (!isNewRequest) {
      // Load request data from Supabase for editing
      const fetchRequest = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('laundry_requests')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) {
            throw error;
          }
          
          if (data) {
            // Map database fields to form fields
            setFormData({
              name: data.name,
              phone: data.phone,
              email: data.email || '',
              address: data.address,
              city: data.city,
              zipCode: data.zip_code,
              date: data.date,
              time: data.time,
              serviceType: data.service_type,
              notes: data.notes || '',
              status: data.status
            });
          } else {
            toast({
              title: "Request Not Found",
              description: "The requested pickup request could not be found",
              variant: "destructive"
            });
            navigate('/admin');
          }
        } catch (error) {
          console.error('Error fetching request:', error);
          toast({
            title: "Error",
            description: "Failed to load request details",
            variant: "destructive"
          });
          navigate('/admin');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchRequest();
    }
  }, [id, isNewRequest, navigate, toast]);
  
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
      // Map form fields to database fields
      const requestData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null, // Convert empty string to null
        address: formData.address,
        city: formData.city,
        zip_code: formData.zipCode,
        date: formData.date,
        time: formData.time,
        service_type: formData.serviceType,
        notes: formData.notes || null, // Convert empty string to null
        status: formData.status
      };
      
      if (isNewRequest) {
        // Create a new request
        const { error } = await supabase
          .from('laundry_requests')
          .insert(requestData);
          
        if (error) {
          throw error;
        }
        
        toast({
          title: "Request Created",
          description: "The pickup request has been created successfully"
        });
      } else {
        // Update existing request
        const { error } = await supabase
          .from('laundry_requests')
          .update(requestData)
          .eq('id', id);
          
        if (error) {
          throw error;
        }
        
        toast({
          title: "Request Updated",
          description: "The pickup request has been updated successfully"
        });
      }
      
      navigate('/admin');
    } catch (error) {
      console.error('Error saving request:', error);
      toast({
        title: "Error",
        description: "There was an error saving the request",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 font-['Inter'] font-normal">Loading...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <AdminSidebar activePage="requests" onLogout={() => {
              localStorage.removeItem('laundryAdminAuth');
              navigate('/admin');
            }} />
            
            <div className="flex-1">
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/60">
                <div className="flex items-center space-x-2 mb-6">
                  <button onClick={() => navigate('/admin')} className="text-gray-500 hover:text-laundry-blue">
                    <ArrowLeft size={18} />
                  </button>
                  <h1 className="text-2xl font-normal font-['Inter']">{isNewRequest ? 'Add New Request' : 'Edit Request'}</h1>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg p-5 shadow-sm">
                      <h2 className="text-lg font-normal mb-4 font-['Inter']">Customer Information</h2>
                      
                      <div className="space-y-4">
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
                            placeholder="Customer's full name"
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
                            placeholder="Customer's phone number"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-gray-700 font-normal mb-2 font-['Inter']">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                            placeholder="Customer's email address (optional)"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg p-5 shadow-sm">
                      <h2 className="text-lg font-normal mb-4 font-['Inter']">Address Information</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="address" className="block text-gray-700 font-normal mb-2 font-['Inter']">Address</label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                            placeholder="Street address"
                          />
                        </div>
                        
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
                    </div>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg p-5 shadow-sm">
                    <h2 className="text-lg font-normal mb-4 font-['Inter']">Pickup Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="date" className="block text-gray-700 font-normal mb-2 font-['Inter']">Pickup Date</label>
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
                            className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="block text-gray-700 font-normal mb-2 font-['Inter']">Pickup Time</label>
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
                      
                      <div>
                        <label htmlFor="status" className="block text-gray-700 font-normal mb-2 font-['Inter']">Status</label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
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
                      
                      <div>
                        <label htmlFor="notes" className="block text-gray-700 font-normal mb-2 font-['Inter']">Special Instructions</label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                          placeholder="Any special instructions or notes"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => navigate('/admin')}
                      className="px-4 py-2 bg-white/80 border border-gray-200 rounded-lg hover:bg-white/90 shadow-sm font-['Inter'] font-normal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-laundry-blue bg-opacity-90 backdrop-blur-sm text-white rounded-lg hover:bg-laundry-darkBlue shadow-md hover:shadow-lg font-['Inter'] font-normal"
                    >
                      {isSubmitting ? 'Saving...' : (isNewRequest ? 'Create Request' : 'Update Request')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminEditRequest;
