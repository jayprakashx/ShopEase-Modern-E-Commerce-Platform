import React, { useState } from 'react'; // Added useState
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  // State for placement animation
  const [isPlacing, setIsPlacing] = useState(false);

  // Calculate total: Price * Quantity
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to complete your purchase.");
      return navigate('/login');
    }

    // Start Animation
    setIsPlacing(true);

    try {
      const token = localStorage.getItem('token');
      const orderData = {
        user: user.id,
        items: cart,
        totalAmount: totalAmount
      };

      // Send to backend
      await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Simulation for smooth animation feel
      setTimeout(() => {
        setIsPlacing(false);
        alert("Order Placed Successfully! Visit History for Tracking.");
        clearCart(); 
        navigate('/order-history');
      }, 2000);

    } catch (err) {
      setIsPlacing(false); // Stop animation if it fails
      console.error("Checkout Error:", err);
      alert("Failed to place order. Ensure your backend server is running!");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary mt-3">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 position-relative">
      {/* 🚀 Placement Animation Overlay */}
      {isPlacing && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', zIndex: 10000 }}>
          <div className="text-center">
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
            <h3 className="mt-4 fw-bold">Processing Your Order...</h3>
            <p className="text-muted text-uppercase small">Jayprakash, please wait while we confirm your items.</p>
          </div>
        </div>
      )}

      <h2 className="fw-bold mb-4">Your Shopping Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end mt-4 mb-5 p-4 bg-light rounded shadow-sm">
        <h3 className="fw-bold">Total Amount: ₹{totalAmount}</h3>
        <button className="btn btn-outline-danger me-2" onClick={clearCart}>Clear Cart</button>
        <button className="btn btn-success px-5 fw-bold" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;