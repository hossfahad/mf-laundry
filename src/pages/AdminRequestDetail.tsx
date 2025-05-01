
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
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

const AdminRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [request, setRequest] = useState<LaundryRequest | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('laundryAdminAuth');
    if (auth !== 'true') {
      navigate('/admin');
      return;
    }
    
    // Load request data from Supabase
    const fetchRequest = async () => {
      try {
        if (!id) return;
        
        const { data, error } = await supabase
          .from('laundry_requests')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setRequest(data);
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
        setLoading(false);
      }
    };
    
    fetchRequest();
  }, [id, navigate, toast]);
  
  // Update request status
  const updateRequestStatus = async (status: string) => {
    if (!request) return;
    
    try {
      const { error } = await supabase
        .from('laundry_requests')
        .update({ status })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setRequest({ ...request, status });
      
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
  const deleteRequest = async () => {
    if (confirm("Are you sure you want to delete this request?")) {
      try {
        const { error } = await supabase
          .from('laundry_requests')
          .delete()
          .eq('id', id);
          
        if (error) {
          throw error;
        }
        
        toast({
          title: "Request Deleted",
          description: "The request has been deleted successfully"
        });
        
        navigate('/admin');
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
  
  if (loading) {
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
  
  if (!request) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-gray-500 font-['Inter'] font-normal mb-4">Request not found</p>
                <Link to="/admin" className="text-laundry-blue hover:underline font-['Inter'] font-normal">Back to Admin</Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Format service type for display
  const formatServiceType = (type: string) => {
    switch(type) {
      case 'wash-fold':
        return 'Wash & Fold';
      case 'dry-cleaning':
        return 'Dry Cleaning';
      case 'both':
        return 'Wash & Fold + Dry Cleaning';
      default:
        return type;
    }
  };
  
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
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <Link to="/admin" className="text-gray-500 hover:text-laundry-blue">
                      <ArrowLeft size={18} />
                    </Link>
                    <h1 className="text-2xl font-normal font-['Inter']">Request Details</h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/edit/${id}`)}
                      className="flex items-center space-x-1 bg-white/70 text-gray-700 px-3 py-1 rounded-lg hover:bg-white border border-gray-200 shadow-sm font-['Inter'] font-normal"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={deleteRequest}
                      className="flex items-center space-x-1 bg-red-50/80 text-red-700 px-3 py-1 rounded-lg hover:bg-red-100/80 border border-red-100 shadow-sm font-['Inter'] font-normal"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Customer Information */}
                  <div className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg p-5 shadow-sm">
                    <h2 className="text-lg font-normal mb-4 font-['Inter']">Customer Information</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 font-['Inter'] font-normal">Name</p>
                        <p className="font-['Open_Sans'] font-normal">{request.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-['Inter'] font-normal">Phone</p>
                        <p className="font-['Open_Sans'] font-normal">{request.phone}</p>
                      </div>
                      {request.email && (
                        <div>
                          <p className="text-sm text-gray-500 font-['Inter'] font-normal">Email</p>
                          <p className="font-['Open_Sans'] font-normal">{request.email}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-500 font-['Inter'] font-normal">Address</p>
                        <p className="font-['Open_Sans'] font-normal">{`${request.address}, ${request.city} ${request.zip_code}`}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Request Details */}
                  <div className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg p-5 shadow-sm">
                    <h2 className="text-lg font-normal mb-4 font-['Inter']">Pickup Details</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 font-['Inter'] font-normal">Service Type</p>
                        <p className="font-['Open_Sans'] font-normal">{formatServiceType(request.service_type)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-['Inter'] font-normal">Date</p>
                        <p className="font-['Open_Sans'] font-normal">{request.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-['Inter'] font-normal">Time</p>
                        <p className="font-['Open_Sans'] font-normal">{request.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-['Inter'] font-normal">Status</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-normal ${
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                          <select
                            value={request.status}
                            onChange={(e) => updateRequestStatus(e.target.value)}
                            className="text-sm bg-white/70 border border-gray-200 rounded-lg px-2 py-1 font-['Open_Sans'] font-light"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Notes Section */}
                {request.notes && (
                  <div className="mb-8">
                    <h2 className="text-lg font-normal mb-2 font-['Inter']">Special Instructions</h2>
                    <div className="bg-gray-50/80 p-4 rounded-lg border border-gray-100 shadow-sm">
                      <p className="text-gray-700 font-['Open_Sans'] font-light">{request.notes}</p>
                    </div>
                  </div>
                )}
                
                {/* Actions Section */}
                <div className="flex justify-end space-x-4">
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-white/80 border border-gray-200 rounded-lg hover:bg-white/90 shadow-sm font-['Inter'] font-normal"
                  >
                    Back to List
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminRequestDetail;
