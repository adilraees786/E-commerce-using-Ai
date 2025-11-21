import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    // Load orders from localStorage on mount
    const [orders, setOrders] = useState(() => {
        try {
            const savedOrders = localStorage.getItem('orders');
            return savedOrders ? JSON.parse(savedOrders) : [];
        } catch (error) {
            return [];
        }
    });

    // Save orders to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // Add new order
    const addOrder = (orderData) => {
        const newOrder = {
            id: Date.now().toString(), // Generate unique ID
            ...orderData,
            status: 'Pending',
            createdAt: new Date().toISOString(),
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
        };

        setOrders((prevOrders) => [newOrder, ...prevOrders]);
        return newOrder;
    };

    // Update order status
    const updateOrderStatus = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    // Delete order
    const deleteOrder = (orderId) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    };

    // Get order by ID
    const getOrderById = (orderId) => {
        return orders.find((order) => order.id === orderId);
    };

    // Get total sales
    const getTotalSales = () => {
        return orders.reduce((total, order) => {
            return total + parseFloat(order.total || 0);
        }, 0);
    };

    // Get orders count
    const getOrdersCount = () => {
        return orders.length;
    };

    // Get recent orders
    const getRecentOrders = (limit = 5) => {
        return orders.slice(0, limit);
    };

    const value = {
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        getOrderById,
        getTotalSales,
        getOrdersCount,
        getRecentOrders,
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};