import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import Products from './components/Products';
import Categories from './components/Categories';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import PageLoader from './components/PageLoader';
import { fadeIn } from './utils/animations';
import './App.css';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminOrders from './components/admin/AdminOrders';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Component to handle page title updates
const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      '/': 'Home - My Website',
      '/products': 'Products - My Website',
      '/categories': 'Categories - My Website',
      '/about': 'About Us - My Website',
      '/contact': 'Contact Us - My Website',
      '/cart': 'Shopping Cart - My Website',
      '/checkout': 'Checkout - My Website',
      '/admin': 'Admin Dashboard - My Website',
      '/admin/products': 'Products Management - Admin Panel',
      '/admin/orders': 'Orders Management - Admin Panel',
      '/admin/users': 'Users Management - Admin Panel',
      '/admin/categories': 'Categories Management - Admin Panel',
      '/admin/settings': 'Settings - Admin Panel',
    };

    document.title = pageTitles[location.pathname] || 'My Website';
  }, [location]);

  return null;
};

// Component to handle route animations
const AnimatedRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Route change par loader show karein
    setIsLoading(true);
    
    // 2-3 seconds ke baad loader hide karein
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <PageTitle />
      <PageLoader isLoading={isLoading} />
      {/* Only show Navbar and Footer for non-admin routes */}
      {!isAdminRoute && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Admin Routes - Protected */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<div className="p-8"><h1 className="text-3xl font-bold">Users Management</h1></div>} />
            <Route path="categories" element={<div className="p-8"><h1 className="text-3xl font-bold">Categories Management</h1></div>} />
            <Route path="settings" element={<div className="p-8"><h1 className="text-3xl font-bold">Settings</h1></div>} />
          </Route>
        </Routes>
      </AnimatePresence>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;