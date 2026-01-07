import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedLayout = ({ children }) => {
  const token = localStorage.getItem('access'); // JWT
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedLayout;
