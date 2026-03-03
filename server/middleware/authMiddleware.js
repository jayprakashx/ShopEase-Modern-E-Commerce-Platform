import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">My Purchase History</h2>
      {orders.length === 0 ? <p>No orders found.</p> : (
        orders.map(order => (
          <div key={order._id} className="card mb-3 shadow-sm p-3">
            <h5>Order ID: {order._id}</h5>
            <p>Total: ₹{order.totalAmount} | Status: <span className="text-success">{order.status}</span></p>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>{item.name} (x{item.quantity})</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;