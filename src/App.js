import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Page Imports
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from './pages/Cart.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
import Profile from './pages/Profile.jsx'; // Added to fix the 'Profile' error
import ProductDetails from './pages/ProductDetails.jsx'; // Added for the Amazon-style view

// Component Imports
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Function to protect routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main className="container mt-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Storefront Routes */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            
            {/* User Features */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/track-order" element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            
            {/* Redirect any unknown path to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;