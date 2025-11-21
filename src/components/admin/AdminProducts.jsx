import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem, defaultTransition } from '../../utils/animations';

const AdminProducts = () => {
  const [products] = useState([
    { id: 1, name: 'Wireless Headphones', price: '$129.99', stock: 45, category: 'Electronics', status: 'Active' },
    { id: 2, name: 'Smart Watch Pro', price: '$249.99', stock: 23, category: 'Electronics', status: 'Active' },
    { id: 3, name: 'Running Shoes', price: '$89.99', stock: 67, category: 'Sports', status: 'Active' },
    { id: 4, name: 'Laptop Backpack', price: '$49.99', stock: 12, category: 'Fashion', status: 'Low Stock' },
  ]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + Add New Product
        </motion.button>
      </div>

      <motion.div
        className="bg-white rounded-xl shadow-md overflow-hidden"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <motion.tr
                  key={product.id}
                  variants={staggerItem}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminProducts;
