
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

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
    
    // Load request data from localStorage
    const savedRequests = JSON.parse(localStorage.getItem('laundryRequests') || '[]');
    const foundRequest = savedRequests.find((r: LaundryRequest) => r.id === id);
    
    if (foundRequest) {
      setRequest(foundRequest);
    } else {
      toast({
        title: "Request Not Found",
        description: "The requested pickup request could not be found",
        variant: "destructive"
      });
      navigate('/admin');
    }
    
    setLoading(false);
  }, [id, navigate, toast]);
  
  // Update request status
  const updateRequestStatus = (status: string) => {
    if (!request) return;
    
    const updatedRequests = JSON.parse(localStorage.getItem('laundryRequests') || '[]')
      .map((r: LaundryRequest) => {
        if (r.id === id) {
          return { ...r, status };
        }
        return r;
      });
    
    localStorage.setItem('laundryRequests', JSON.stringify(updatedRequests));
    setRequest({ ...request, status });
    
    toast({
      title: "Status Updated",
      description: `Request status changed to ${status}`
    });
  };
  
  // Delete request
  const deleteRequest = () => {
    if (confirm("Are you sure you want to delete this request?")) {
      const updatedRequests = JSON.parse(localStorage.getItem('laundryRequests') || '[]')
        .filter((r: LaundryRequest) => r.id !== id);
      
      localStorage.setItem('laundryRequests', JSON.stringify(updatedRequests));
      
      toast({
        title: "Request Deleted",
        description: "The request has been deleted successfully"
      });
      
      navigate('/admin');
    }
  };
  
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  
  if (!request) {
    return (
      <div className="p-8 text-center">
        <p>Request not found</p>
        <Link to="/admin" className="text-laundry-blue hover:underline">Back to Admin</Link>
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
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <Link to="/admin" className="text-gray-500 hover:text-laundry-blue">
                      <ArrowLeft size={18} />
                    </Link>
                    <h1 className="text-2xl font-bold">Request Details</h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/edit/${id}`)}
                      className="flex items-center space-x-1 bg-laundry-lightGray text-gray-700 px-3 py-1 rounded hover:bg-gray-200"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={deleteRequest}
                      className="flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Customer Information */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h2 className="text-lg font-bold mb-4">Customer Information</h2>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{request.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{request.phone}</p>
                      </div>
                      {request.email && (
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{request.email}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{`${request.address}, ${request.city} ${request.zipCode}`}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Request Details */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h2 className="text-lg font-bold mb-4">Pickup Details</h2>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Service Type</p>
                        <p className="font-medium">{formatServiceType(request.serviceType)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{request.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{request.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                            className="text-sm border border-gray-300 rounded px-1"
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
                    <h2 className="text-lg font-bold mb-2">Special Instructions</h2>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-700">{request.notes}</p>
                    </div>
                  </div>
                )}
                
                {/* Actions Section */}
                <div className="flex justify-end space-x-4">
                  <Link
                    to="/admin"
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
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
