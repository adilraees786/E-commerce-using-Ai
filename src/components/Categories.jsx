import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  // Sample categories data - replace with real data from API or state
  const allCategories = [
    {
      id: 1,
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=500',
      count: '1,234 products',
      description: 'Latest gadgets and tech products'
    },
    {
      id: 2,
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500',
      count: '856 products',
      description: 'Trendy clothing and accessories'
    },
    {
      id: 3,
      name: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
      count: '642 products',
      description: 'Furniture and home essentials'
    },
    {
      id: 4,
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      count: '428 products',
      description: 'Fitness equipment and sportswear'
    },
    {
      id: 5,
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
      count: '312 products',
      description: 'Books for all genres and ages'
    },
    {
      id: 6,
      name: 'Beauty & Personal Care',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500',
      count: '567 products',
      description: 'Skincare and beauty products'
    },
    {
      id: 7,
      name: 'Toys & Games',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      count: '289 products',
      description: 'Fun toys and games for everyone'
    },
    {
      id: 8,
      name: 'Automotive',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500',
      count: '423 products',
      description: 'Car accessories and parts'
    },
    {
      id: 9,
      name: 'Health & Wellness',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
      count: '398 products',
      description: 'Health supplements and wellness products'
    },
    {
      id: 10,
      name: 'Pet Supplies',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500',
      count: '267 products',
      description: 'Everything for your furry friends'
    },
    {
      id: 11,
      name: 'Jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
      count: '445 products',
      description: 'Elegant jewelry and watches'
    },
    {
      id: 12,
      name: 'Food & Beverages',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500',
      count: '521 products',
      description: 'Gourmet foods and beverages'
    }
  ];

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter categories
  const filteredCategories = allCategories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Matching Home page */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Shop by Category
              <span className="block text-yellow-300">Explore Everything</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Browse through our wide range of product categories. Find exactly what you're looking for with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 font-medium">
              {filteredCategories.length} {filteredCategories.length === 1 ? 'Category' : 'Categories'} Found
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.name}`}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-bold rounded-full">
                        {category.count}
                      </span>
                    </div>

                    {/* Category Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-200">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                        {category.description}
                      </p>
                      <div className="flex items-center text-yellow-300 font-semibold text-sm">
                        Shop Now
                        <svg
                          className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Hover Overlay Effect */}
                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">No categories found</h3>
              <p className="mt-2 text-gray-600">
                Try adjusting your search query or check back later.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - Matching Home page */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Shop With Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer the best shopping experience with premium quality and excellent service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: 'Free Shipping',
                description: 'On orders over $50'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Secure Payment',
                description: '100% protected transactions'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: 'Easy Returns',
                description: '30-day return policy'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: '24/7 Support',
                description: 'Dedicated customer care'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Categories;