import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOrders } from '../../context/OrderContext';
import { fadeIn, staggerContainer, staggerItem, defaultTransition } from '../../utils/animations';

const AdminUsers = () => {
  const { orders } = useOrders();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  // Fetch all users from localStorage and orders
  useEffect(() => {
    const allUsers = [];

    // Get current logged-in user from localStorage
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData && userData.email) {
          allUsers.push({
            ...userData,
            source: 'registered'
          });
        }
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    }

    // Extract unique users from orders
    const orderUsers = new Map();
    orders.forEach(order => {
      if (order.customerDetails?.email) {
        const email = order.customerDetails.email;
        if (!orderUsers.has(email)) {
          orderUsers.set(email, {
            id: order.customerDetails.email,
            firstName: order.customerDetails.firstName || '',
            lastName: order.customerDetails.lastName || '',
            email: order.customerDetails.email,
            phone: order.customerDetails.phone || 'N/A',
            address: order.customerDetails.shippingAddress 
              ? `${order.customerDetails.shippingAddress.street || ''}, ${order.customerDetails.shippingAddress.city || ''}`
              : 'N/A',
            createdAt: order.createdAt || order.date,
            role: 'user',
            source: 'order',
            totalOrders: 0,
            totalSpent: 0
          });
        }
        // Update order count and total spent
        const user = orderUsers.get(email);
        user.totalOrders += 1;
        user.totalSpent += parseFloat(order.total || 0);
      }
    });

    // Merge users, avoiding duplicates
    const mergedUsers = [...allUsers];
    orderUsers.forEach((orderUser, email) => {
      const exists = mergedUsers.find(u => u.email === email);
      if (!exists) {
        mergedUsers.push(orderUser);
      } else {
        // Update existing user with order data
        const index = mergedUsers.findIndex(u => u.email === email);
        mergedUsers[index] = {
          ...mergedUsers[index],
          totalOrders: (mergedUsers[index].totalOrders || 0) + orderUser.totalOrders,
          totalSpent: (mergedUsers[index].totalSpent || 0) + orderUser.totalSpent
        };
      }
    });

    setUsers(mergedUsers);
  }, [orders]);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'All' || user.role === filterRole.toLowerCase();
    
    return matchesSearch && matchesRole;
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  // Format amount
  const formatAmount = (amount) => {
    return `$${parseFloat(amount || 0).toFixed(2)}`;
  };

  // Get user orders
  const getUserOrders = (userEmail) => {
    return orders.filter(order => order.customerDetails?.email === userEmail);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      {/* Page Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={defaultTransition}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Management</h1>
        <p className="text-gray-600">View and manage all registered users</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {[
          { title: 'Total Users', value: users.length, color: 'from-blue-500 to-blue-600' },
          { title: 'Registered Users', value: users.filter(u => u.source === 'registered').length, color: 'from-green-500 to-green-600' },
          { title: 'Order Customers', value: users.filter(u => u.source === 'order').length, color: 'from-purple-500 to-purple-600' },
          { title: 'Active Users', value: users.filter(u => (u.totalOrders || 0) > 0).length, color: 'from-orange-500 to-orange-600' },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={staggerItem}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} rounded-xl shadow-md p-6 text-white`}
            whileHover={{ y: -5 }}
          >
            <p className="text-white/80 text-sm font-medium mb-1">{stat.title}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...defaultTransition }}
      >
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Users
              </label>
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Users</option>
                <option value="user">Regular Users</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        className="bg-white rounded-xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ...defaultTransition }}
      >
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Users Found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria.' : 'Users will appear here when they register or place orders.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id || user.email}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{user.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.totalOrders || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatAmount(user.totalSpent || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.source === 'registered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.source === 'registered' ? 'Registered' : 'Customer'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* User Details Modal */}
      {selectedUser && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedUser(null)}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                User Details
              </h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* User Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">First Name</p>
                    <p className="font-medium">{selectedUser.firstName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Name</p>
                    <p className="font-medium">{selectedUser.lastName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedUser.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedUser.phone || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{selectedUser.address || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Registration Date</p>
                    <p className="font-medium">{formatDate(selectedUser.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedUser.source === 'registered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedUser.source === 'registered' ? 'Registered User' : 'Order Customer'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Statistics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedUser.totalOrders || 0}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">{formatAmount(selectedUser.totalSpent || 0)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Average Order</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedUser.totalOrders > 0 
                        ? formatAmount((selectedUser.totalSpent || 0) / selectedUser.totalOrders)
                        : '$0.00'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              {getUserOrders(selectedUser.email).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {getUserOrders(selectedUser.email).slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Order #{order.id ? order.id.slice(-6) : 'N/A'}</p>
                          <p className="text-sm text-gray-600">{formatDate(order.date || order.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatAmount(order.total)}</p>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminUsers;