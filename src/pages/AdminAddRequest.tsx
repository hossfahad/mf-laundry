
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminEditRequest from './AdminEditRequest';

const AdminAddRequest = () => {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  React.useEffect(() => {
    const auth = localStorage.getItem('laundryAdminAuth');
    if (auth !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);
  
  return <AdminEditRequest />;
};

export default AdminAddRequest;
