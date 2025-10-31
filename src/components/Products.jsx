import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

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
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Our Products
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Explore our complete collection of premium products. Find exactly what you're looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sort Section */}
      <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 mr-2">Category:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {product.discount}
                      </div>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      {/* Quick View Button */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full py-3 text-blue-600 font-semibold hover:bg-blue-50 transition-colors duration-200">
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                        <span className="text-gray-400 line-through">{product.originalPrice}</span>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            currentPage === pageNumber
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300 hover:border-blue-500'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">No products found</h3>
              <p className="mt-2 text-gray-600">
                Try selecting a different category or check back later.
              </p>
            </div>
          )}
        </div>
      </section>

     
    </div>
  );
};

export default Products;