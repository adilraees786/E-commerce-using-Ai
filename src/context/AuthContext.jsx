


import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already logged in (from localStorage)
    const savedAuth = localStorage.getItem('adminAuth');
    return savedAuth === 'true';
  });

  const [isLoading, setIsLoading] = useState(false);

  // Login function
  const login = async (username, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Default credentials (in production, this should be API call)
    // You can change these credentials
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setIsLoading(false);
      return { success: true, message: 'Login successful!' };
    } else {
      setIsLoading(false);
      return { success: false, message: 'Invalid username or password!' };
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};