import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import Products from './components/Products';
import Categories from './components/Categories';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
    };

    document.title = pageTitles[location.pathname] || 'My Website';
  }, [location]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <PageTitle />
        <Navbar />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

