import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '../utils/animations';
const Products = () => {
  const { addToCart } = useCart(); // Get addToCart function from context
  // Sample product data - replace with real data from API or state
  const allProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: '$129.99',
      originalPrice: '$199.99',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      discount: '35% OFF',
      category: 'Electronics',
      rating: 4.5,
      reviews: 124
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: '$249.99',
      originalPrice: '$349.99',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      discount: '29% OFF',
      category: 'Electronics',
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: '$89.99',
      originalPrice: '$129.99',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      discount: '31% OFF',
      category: 'Sports',
      rating: 4.6,
      reviews: 156
    },
    {
      id: 4,
      name: 'Laptop Backpack',
      price: '$49.99',
      originalPrice: '$79.99',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      discount: '38% OFF',
      category: 'Fashion',
      rating: 4.4,
      reviews: 203
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      price: '$79.99',
      originalPrice: '$119.99',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
      discount: '33% OFF',
      category: 'Electronics',
      rating: 4.7,
      reviews: 98
    },
    {
      id: 6,
      name: 'Designer Sunglasses',
      price: '$159.99',
      originalPrice: '$229.99',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
      discount: '30% OFF',
      category: 'Fashion',
      rating: 4.5,
      reviews: 167
    },
    {
      id: 7,
      name: 'Yoga Mat Premium',
      price: '$39.99',
      originalPrice: '$59.99',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83d34e22?w=500',
      discount: '33% OFF',
      category: 'Sports',
      rating: 4.6,
      reviews: 134
    },
    {
      id: 8,
      name: 'Coffee Maker',
      price: '$89.99',
      originalPrice: '$129.99',
      image: 'https://images.unsplash.com/photo-1517668808823-465d15cae351?w=500',
      discount: '31% OFF',
      category: 'Home & Garden',
      rating: 4.8,
      reviews: 245
    },
    {
      id: 9,
      name: 'Smartphone Case',
      price: '$24.99',
      originalPrice: '$39.99',
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500',
      discount: '38% OFF',
      category: 'Electronics',
      rating: 4.3,
      reviews: 189
    },
    {
      id: 10,
      name: 'Leather Wallet',
      price: '$59.99',
      originalPrice: '$89.99',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
      discount: '33% OFF',
      category: 'Fashion',
      rating: 4.7,
      reviews: 112
    },
    {
      id: 11,
      name: 'Fitness Tracker',
      price: '$99.99',
      originalPrice: '$149.99',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
      discount: '33% OFF',
      category: 'Sports',
      rating: 4.6,
      reviews: 178
    },
    {
      id: 12,
      name: 'Plant Stand Set',
      price: '$69.99',
      originalPrice: '$99.99',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
      discount: '30% OFF',
      category: 'Home & Garden',
      rating: 4.5,
      reviews: 91
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Filter and sort products
  const filteredProducts = allProducts
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'price-high':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get unique categories
  const categories = ['All', ...new Set(allProducts.map(product => product.category))];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      className="bg-white min-h-screen"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Our Products
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Explore our complete collection of premium products. Find exactly what you're looking for.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ... existing filters section ... */}

      {/* Products Grid Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentProducts.length > 0 ? (
            <>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                    variants={staggerItem}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    layout
                  >
                    {/* ... existing product card content ... */}
                    <motion.button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Add to Cart
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
              {/* ... existing pagination ... */}
            </>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* ... existing empty state ... */}
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Products;