import React, { useState, useMemo, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '../utils/animations';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useReviews } from '../context/ReviewContext';
import ProductReviews from './ProductReviews';

const Products = () => {
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist, isInWishlist } = useWishlist();
  const { success, error } = useToast();
  const { getAverageRating } = useReviews();

  // Sample product data - moved outside component to prevent recreation on every render
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
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  const productsPerPage = 12;

  // Utility function to parse price safely
  const parsePrice = useCallback((priceString) => {
    if (!priceString || typeof priceString !== 'string') return 0;
    const cleaned = priceString.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  // Memoized categories - only recalculates if products change
  const categories = useMemo(() => {
    return ['All', ...new Set(allProducts.map(product => product.category))];
  }, []);

  // Memoized filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parsePrice(a.price) - parsePrice(b.price);
        case 'price-high':
          return parsePrice(b.price) - parsePrice(a.price);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy, searchQuery, parsePrice]);

  // Memoized pagination
  const paginationData = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return {
      currentProducts,
      totalPages,
      indexOfFirstProduct,
      indexOfLastProduct
    };
  }, [filteredProducts, currentPage, productsPerPage]);

  // Handlers with useCallback to prevent unnecessary re-renders
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleImageError = useCallback((productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  }, []);

  const handleAddToCart = useCallback((product) => {
    try {
      addToCart(product);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // You could add a toast notification here
    }
  }, [addToCart]);

  // Default placeholder image
  const defaultImage = 'https://via.placeholder.com/500x500?text=Product+Image';

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

      {/* Filters Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="w-full">
              <label htmlFor="search" className="sr-only">
                Search products
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search products by name or category..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search products"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    aria-pressed={selectedCategory === category}
                    aria-label={`Filter by ${category}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Filter */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-gray-600">
              Showing {paginationData.currentProducts.length} of {filteredProducts.length} products
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {paginationData.currentProducts.length > 0 ? (
            <>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                transition={{ staggerChildren: 0.01, delayChildren: 0 }}
              >
                {paginationData.currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                    variants={staggerItem}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-100">
                      <img
                        src={imageErrors[product.id] ? defaultImage : product.image}
                        alt={`${product.name} - ${product.category}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={() => handleImageError(product.id)}
                        loading="lazy"
                      />
                      {product.discount && (
                        <div
                          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold"
                          aria-label={`Discount: ${product.discount}`}
                        >
                          {product.discount}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1" aria-label={`Category: ${product.category}`}>
                        {product.category}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                        <span className="text-yellow-400" aria-hidden="true">★</span>
                        <span className="text-sm text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-blue-600" aria-label={`Price: ${product.price}`}>
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through" aria-label={`Original price: ${product.originalPrice}`}>
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        Add to Cart
                      </motion.button>

                      {/* Wishlist Button */}
                      <motion.button
                        onClick={() => {
                          toggleWishlist(product);
                          isInWishlist(product.id)
                            ? success('Removed from wishlist')
                            : success('Added to wishlist');
                        }}
                        className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Add ${product.name} to wishlist`}
                      >
                        <svg
                          className={`w-5 h-5 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                          fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {paginationData.totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Go to previous page"
                  >
                    Previous
                  </button>

                  {Array.from({ length: paginationData.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === paginationData.totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Go to next page"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery
                  ? `No products match "${searchQuery}". Try adjusting your search or filters.`
                  : 'Try adjusting your filters to see more products.'}
              </p>
              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setCurrentPage(1);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Products;