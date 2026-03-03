import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBoxOpen, FaHistory } from 'react-icons/fa';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders specifically for the logged-in user
        const { data } = await axios.get(`http://localhost:5000/api/orders/user/${user.id}`);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching order history:", err);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <FaHistory className="text-primary" /> Your Purchase History
      </h2>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div className="card shadow-sm mb-4 border-0" key={order._id}>
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <span className="text-muted small text-uppercase fw-bold">Order ID: {order._id}</span>
              <span className="badge bg-info text-dark">{order.status}</span>
            </div>
            <div className="card-body">
              {order.items.map((item, index) => (
                <div key={index} className="d-flex justify-content-between border-bottom py-2">
                  <span>{item.name} <span className="text-muted">x{item.quantity}</span></span>
                  <span className="fw-bold">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="text-end mt-3">
                <h5 className="fw-bold text-primary">Total Paid: ₹{order.totalAmount}</h5>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5">
          <FaBoxOpen size={50} className="text-muted mb-3" />
          <h4 className="text-muted">No orders found yet.</h4>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;