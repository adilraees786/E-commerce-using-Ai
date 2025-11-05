import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import Products from './components/Products';
import Categories from './components/Categories';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import { fadeIn } from './utils/animations';

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
    };

    document.title = pageTitles[location.pathname] || 'My Website';
  }, [location]);

  return null;
};

// Component to handle route animations
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <PageTitle />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;