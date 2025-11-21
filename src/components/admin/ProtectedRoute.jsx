import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from './AdminLogin';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return children;
};

export default ProtectedRoute;
