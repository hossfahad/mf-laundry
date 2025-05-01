
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

interface LaundryRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  date: string;
  time: string;
  serviceType: string;
  notes: string;
  status: string;
  createdAt: string;
}

const AdminEditRequest = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isNewRequest = id === 'new';
  
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
  
  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('laundryAdminAuth');
    if (auth !== 'true') {
      navigate('/admin');
      return;
    }
    
    if (!isNewRequest) {
      // Load request data from localStorage for editing
      const savedRequests = JSON.parse(localStorage.getItem('laundryRequests') || '[]');
      const foundRequest = savedRequests.find((r: LaundryRequest) => r.id === id);
      
      if (foundRequest) {
        const { id: requestId, createdAt, ...requestData } = foundRequest;
        setFormData(requestData);
      } else {
        toast({
          title: "Request Not Found",
          description: "The requested pickup request could not be found",
          variant: "destructive"
        });
        navigate('/admin');
      }
    }
  }, [id, isNewRequest, navigate, toast]);
  
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
    
    try {
      const savedRequests = JSON.parse(localStorage.getItem('laundryRequests') || '[]');
      
      if (isNewRequest) {
        // Create a new request
        const newRequest = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        
        savedRequests.push(newRequest);
        localStorage.setItem('laundryRequests', JSON.stringify(savedRequests));
        
        toast({
          title: "Request Created",
          description: "The pickup request has been created successfully"
        });
      } else {
        // Update existing request
        const updatedRequests = savedRequests.map((r: LaundryRequest) => {
          if (r.id === id) {
            return { ...r, ...formData };
          }
          return r;
        });
        
        localStorage.setItem('laundryRequests', JSON.stringify(updatedRequests));
        
        toast({
          title: "Request Updated",
          description: "The pickup request has been updated successfully"
        });
      }
      
      navigate('/admin');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving the request",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <AdminSidebar activePage="requests" onLogout={() => {
              localStorage.removeItem('laundryAdminAuth');
              navigate('/admin');
            }} />
            
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <button onClick={() => navigate('/admin')} className="text-gray-500 hover:text-laundry-blue">
                    <ArrowLeft size={18} />
                  </button>
                  <h1 className="text-2xl font-bold">{isNewRequest ? 'Add New Request' : 'Edit Request'}</h1>
                </div>
                
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
                        placeholder="Customer's full name"
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
                        placeholder="Customer's phone number"
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
                      placeholder="Customer's email address (optional)"
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
                      placeholder="Street address"
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Pickup Date</label>
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
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-gray-700 font-medium mb-2">Pickup Time</label>
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
                    
                    <div>
                      <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
                    <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">Special Instructions</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                      placeholder="Any special instructions or notes"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => navigate('/admin')}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-laundry-blue text-white rounded-md hover:bg-laundry-darkBlue"
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
