import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// Icons for all your specific features
import { FaShoppingCart, FaUserCircle, FaHistory, FaSignOutAlt, FaHome, FaUserShield, FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-2">
      <div className="container">
        {/* Professional Branding - Left Aligned */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <span style={{ fontSize: '1.6rem' }}>Shop<span className="text-warning">Ease</span></span>
        </Link>

        {/* Search Bar Removed to clean up the top area */}

        {/* Navigation Items - Right Aligned */}
        <div className="d-flex align-items-center gap-4 ms-auto">
          {/* Home Link with Icon */}
          <Link className="text-dark text-decoration-none d-flex align-items-center gap-1" to="/">
            <FaHome size={20} className="text-primary" />
            <span className="fw-bold d-none d-md-inline">Home</span>
          </Link>

          {/* User Logic: Dropdown if logged in */}
          {user ? (
            <div className="dropdown">
              <button 
                className="btn d-flex align-items-center gap-2 fw-bold text-dark border-0 dropdown-toggle shadow-none" 
                type="button" 
                id="userDropdown"
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <FaUserCircle size={22} className="text-secondary" />
                {user.name ? user.name.split(' ')[0] : 'User'}
              </button>
              
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="userDropdown">
                {/* 🛡️ ADMINISTRATION Link (Fixed Role Check) */}
                {user.role === 'admin' && (
                  <li>
                    <Link className="dropdown-item py-2" to="/admin">
                      <FaUserShield className="me-2 text-info" /> Administration
                    </Link>
                  </li>
                )}
                
                {/* Icons for Profile, History, and Logout */}
                <li>
                  <Link className="dropdown-item py-2 d-flex align-items-center" to="/profile">
                    <FaUserCircle className="me-2 text-muted" /> My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item py-2 d-flex align-items-center" to="/order-history">
                    <FaHistory className="me-2 text-muted" /> Purchase History
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger py-2 d-flex align-items-center" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="text-dark text-decoration-none fw-bold d-flex align-items-center gap-1" to="/login">
              <FaSignInAlt className="text-primary" /> Login
            </Link>
          )}

          {/* Cart Icon with Working Badge */}
          <Link to="/cart" className="text-dark text-decoration-none position-relative">
            <div className="d-flex align-items-center gap-1">
              <FaShoppingCart size={22} />
              <span className="fw-bold d-none d-md-inline">Cart</span>
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;