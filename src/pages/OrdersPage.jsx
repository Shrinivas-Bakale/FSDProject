import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './firebase/firebase';
import axios from 'axios';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(null);  // State to store userId

    const auth = getAuth(firebaseApp);
    const uId = auth.currentUser?.uid;

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi/api/orders/getOrders/${uId}`);
            setOrders(response.data);


        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };



    const formatTimestamp = (timestamp) => {
        const dateObj = new Date(timestamp);

        // Format the date in a readable format
        const formatted = dateObj.toLocaleString('en-US', {
            weekday: 'long', // Day of the week
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true, // AM/PM
        });

        return formatted;
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const [expandedOrder, setExpandedOrder] = useState(null);

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className="container mx-auto py-5">
            <h1 className="text-3xl font-semibold text-center mb-5">Orders</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {orders.length === 0 ? (
                    <div className="col-span-full text-center">No orders available</div>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-lg">
                            <h2 className="text-lg font-semibold mb-2">Order #{index + 1}</h2>
                            <div className="mb-2">
                                <strong>Amount:</strong> ${order.amount}
                            </div>
                            <div className="mb-2">
                                <strong>Address:</strong> {order.address}
                            </div>
                            <div className="mb-2">
                                <strong>Time Slot:</strong> {order.timeSlot.date} {order.timeSlot.time}
                            </div>
                            <div className="mb-2">
                                <strong>Ordered On:</strong> {formatTimestamp(order.createdAt)}
                            </div>
                            <div>
                                <strong>Receipt ID:</strong> {order.receiptId}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>




    );
};

export default OrdersPage;
