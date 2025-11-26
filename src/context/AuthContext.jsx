
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
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    return savedAuth === 'true' || !!user;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      role: 'user',
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true, message: 'Registration successful!' };
  };

  // Login function
  const login = async (username, password, isAdmin = false) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isAdmin) {
      // Admin login
      if (username === 'admin' && password === 'admin123') {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        setIsLoading(false);
        return { success: true, message: 'Login successful!' };
      } else {
        setIsLoading(false);
        return { success: false, message: 'Invalid username or password!' };
      }
    } else {
      // User login - check if user exists
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData.email === username && userData.password === password) {
          setUser(userData);
          setIsAuthenticated(true);
          setIsLoading(false);
          return { success: true, message: 'Login successful!', user: userData };
        }
      }
      setIsLoading(false);
      return { success: false, message: 'Invalid email or password!' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('user');
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      register,
      updateProfile,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};