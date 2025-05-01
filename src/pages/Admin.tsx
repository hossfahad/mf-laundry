
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { Package, Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

// Types for our request data
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

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState<LaundryRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LaundryRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Simple authentication for demo purposes
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple password for demo
      setIsAuthenticated(true);
      localStorage.setItem('laundryAdminAuth', 'true');
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard"
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid password",
        variant: "destructive"
      });
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('laundryAdminAuth');
    toast({
      title: "Logged Out",
      description: "You've been logged out successfully"
    });
  };
  
  // Check if user was previously authenticated
  useEffect(() => {
    const auth = localStorage.getItem('laundryAdminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load requests from Supabase
    if (isAuthenticated) {
      fetchRequests();
    }
  }, [isAuthenticated]);
  
  // Load requests from Supabase
  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('laundry_requests')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setRequests(data);
        setFilteredRequests(data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        title: "Error",
        description: "Failed to load requests",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Apply filters
  useEffect(() => {
    let filtered = [...requests];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }
    
    if (dateFilter) {
      filtered = filtered.filter(request => request.date === dateFilter);
    }
    
    setFilteredRequests(filtered);
  }, [requests, statusFilter, dateFilter]);
  
  // Update request status
  const updateRequestStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('laundry_requests')
        .update({ status })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setRequests(requests.map(request => {
        if (request.id === id) {
          return { ...request, status };
        }
        return request;
      }));
      
      toast({
        title: "Status Updated",
        description: `Request status changed to ${status}`
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update request status",
        variant: "destructive"
      });
    }
  };
  
  // Delete request
  const deleteRequest = async (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      try {
        const { error } = await supabase
          .from('laundry_requests')
          .delete()
          .eq('id', id);
          
        if (error) {
          throw error;
        }
        
        // Update local state
        setRequests(requests.filter(request => request.id !== id));
        
        toast({
          title: "Request Deleted",
          description: "The request has been deleted successfully"
        });
      } catch (error) {
        console.error('Error deleting request:', error);
        toast({
          title: "Delete Failed",
          description: "Failed to delete the request",
          variant: "destructive"
        });
      }
    }
  };
  
  // View request details
  const viewRequestDetails = (id: string) => {
    navigate(`/admin/request/${id}`);
  };
  
  // Edit request
  const editRequest = (id: string) => {
    navigate(`/admin/edit/${id}`);
  };
  
  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />
        <main className="flex-grow">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 border border-white/60">
                <h1 className="text-2xl font-normal mb-6 text-center font-['Inter']">Admin Login</h1>
                <form onSubmit={handleLogin}>
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-normal mb-2 font-['Inter']">Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                      placeholder="Enter admin password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-laundry-blue bg-opacity-90 backdrop-blur-sm text-white py-2 px-4 rounded-lg font-['Inter'] font-normal hover:bg-laundry-darkBlue transition-colors shadow-md hover:shadow-lg"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Admin dashboard
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <AdminSidebar activePage="requests" onLogout={handleLogout} />
            
            <div className="flex-1">
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/60">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-normal font-['Inter']">Pickup & Dropoff Requests</h1>
                  <button
                    onClick={() => navigate('/admin/add')}
                    className="bg-laundry-blue bg-opacity-90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-['Inter'] font-normal hover:bg-laundry-darkBlue transition-colors shadow-md hover:shadow-lg"
                  >
                    Add New Request
                  </button>
                </div>
                
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white/60 backdrop-blur-md rounded-lg border border-white/40">
                  <div>
                    <label htmlFor="statusFilter" className="block text-gray-700 text-sm font-normal mb-1 font-['Inter']">Filter by Status</label>
                    <select
                      id="statusFilter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="dateFilter" className="block text-gray-700 text-sm font-normal mb-1 font-['Inter']">Filter by Date</label>
                    <input
                      type="date"
                      id="dateFilter"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-laundry-blue font-['Open_Sans'] font-light"
                    />
                  </div>
                  
                  <div className="self-end">
                    <button
                      onClick={() => {
                        setStatusFilter('all');
                        setDateFilter('');
                      }}
                      className="px-3 py-2 bg-white/70 border border-gray-200 rounded-lg hover:bg-white/90 transition-colors font-['Inter'] font-normal"
                    >
                      Clear Filters
                    </button>
                    <button
                      onClick={fetchRequests}
                      className="ml-2 px-3 py-2 bg-laundry-lightBlue/70 border border-laundry-blue/20 text-laundry-blue rounded-lg hover:bg-laundry-lightBlue/90 transition-colors font-['Inter'] font-normal"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
                
                {/* Requests Table */}
                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-['Inter'] font-normal">Loading requests...</p>
                  </div>
                ) : filteredRequests.length > 0 ? (
                  <div className="overflow-x-auto bg-white/60 backdrop-blur-sm rounded-lg border border-white/40">
                    <table className="min-w-full">
                      <thead className="bg-laundry-blue/5">
                        <tr>
                          <th className="py-3 px-4 text-left font-['Inter'] font-normal text-gray-600">Name</th>
                          <th className="py-3 px-4 text-left font-['Inter'] font-normal text-gray-600">Address</th>
                          <th className="py-3 px-4 text-left font-['Inter'] font-normal text-gray-600">Phone</th>
                          <th className="py-3 px-4 text-left font-['Inter'] font-normal text-gray-600">Date & Time</th>
                          <th className="py-3 px-4 text-left font-['Inter'] font-normal text-gray-600">Status</th>
                          <th className="py-3 px-4 text-left font-['Inter'] font-normal text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-laundry-blue/5">
                            <td className="py-3 px-4 font-['Open_Sans'] font-light">{request.name}</td>
                            <td className="py-3 px-4 font-['Open_Sans'] font-light">{`${request.address}, ${request.city} ${request.zip_code}`}</td>
                            <td className="py-3 px-4 font-['Open_Sans'] font-light">{request.phone}</td>
                            <td className="py-3 px-4 font-['Open_Sans'] font-light">{`${request.date} ${request.time}`}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-normal ${
                                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                request.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => viewRequestDetails(request.id)}
                                  className="text-gray-600 hover:text-laundry-blue"
                                  title="View Details"
                                >
                                  <Eye size={18} />
                                </button>
                                <button
                                  onClick={() => editRequest(request.id)}
                                  className="text-gray-600 hover:text-green-600"
                                  title="Edit"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => deleteRequest(request.id)}
                                  className="text-gray-600 hover:text-red-600"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                                <select
                                  value={request.status}
                                  onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                                  className="text-sm bg-white/70 border border-gray-200 rounded-md px-1 font-['Open_Sans'] font-light"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40">
                    <div className="bg-gray-100/80 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package size={24} className="text-gray-500" />
                    </div>
                    <p className="text-gray-500 text-lg font-['Inter'] font-normal">No requests found</p>
                    {(statusFilter !== 'all' || dateFilter) && (
                      <p className="text-gray-400 mt-2 font-['Open_Sans'] font-light">Try clearing your filters</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
