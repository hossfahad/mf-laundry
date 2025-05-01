
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { Package, Edit, Trash2, Eye } from 'lucide-react';

// Types for our request data
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

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState<LaundryRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LaundryRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  // Simple authentication for demo purposes
  // In a real app, this would be replaced with proper authentication
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
    
    // Load requests from localStorage
    loadRequests();
  }, []);
  
  // Load requests from localStorage
  const loadRequests = () => {
    const savedRequests = JSON.parse(localStorage.getItem('laundryRequests') || '[]');
    setRequests(savedRequests);
    setFilteredRequests(savedRequests);
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
  const updateRequestStatus = (id: string, status: string) => {
    const updatedRequests = requests.map(request => {
      if (request.id === id) {
        return { ...request, status };
      }
      return request;
    });
    
    setRequests(updatedRequests);
    localStorage.setItem('laundryRequests', JSON.stringify(updatedRequests));
    
    toast({
      title: "Status Updated",
      description: `Request status changed to ${status}`
    });
  };
  
  // Delete request
  const deleteRequest = (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      const updatedRequests = requests.filter(request => request.id !== id);
      setRequests(updatedRequests);
      localStorage.setItem('laundryRequests', JSON.stringify(updatedRequests));
      
      toast({
        title: "Request Deleted",
        description: "The request has been deleted successfully"
      });
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
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                <form onSubmit={handleLogin}>
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                      placeholder="Enter admin password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-laundry-blue text-white py-2 px-4 rounded-md hover:bg-laundry-darkBlue transition-colors"
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <AdminSidebar activePage="requests" onLogout={handleLogout} />
            
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Pickup & Dropoff Requests</h1>
                  <button
                    onClick={() => navigate('/admin/add')}
                    className="bg-laundry-blue text-white px-4 py-2 rounded-md hover:bg-laundry-darkBlue transition-colors"
                  >
                    Add New Request
                  </button>
                </div>
                
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div>
                    <label htmlFor="statusFilter" className="block text-gray-700 text-sm font-medium mb-1">Filter by Status</label>
                    <select
                      id="statusFilter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="dateFilter" className="block text-gray-700 text-sm font-medium mb-1">Filter by Date</label>
                    <input
                      type="date"
                      id="dateFilter"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-blue"
                    />
                  </div>
                  
                  <div className="self-end">
                    <button
                      onClick={() => {
                        setStatusFilter('all');
                        setDateFilter('');
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
                
                {/* Requests Table */}
                {filteredRequests.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-2 px-4 text-left">Name</th>
                          <th className="py-2 px-4 text-left">Address</th>
                          <th className="py-2 px-4 text-left">Phone</th>
                          <th className="py-2 px-4 text-left">Date & Time</th>
                          <th className="py-2 px-4 text-left">Status</th>
                          <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">{request.name}</td>
                            <td className="py-3 px-4">{`${request.address}, ${request.city} ${request.zipCode}`}</td>
                            <td className="py-3 px-4">{request.phone}</td>
                            <td className="py-3 px-4">{`${request.date} ${request.time}`}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                                  className="text-sm border border-gray-300 rounded px-1"
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
                  <div className="text-center py-8">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package size={24} className="text-gray-500" />
                    </div>
                    <p className="text-gray-500 text-lg">No requests found</p>
                    {(statusFilter !== 'all' || dateFilter) && (
                      <p className="text-gray-400 mt-2">Try clearing your filters</p>
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
