import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Productcard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    // We use split(':') to ensure that if an ID has ':1' attached, we only take the ID part
    const cleanId = String(product._id).split(':')[0].trim();
    navigate(`/product/${cleanId}`);
  };

  return (
    <div 
      className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden" 
      onClick={handleCardClick}
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img 
        src={product.image} 
        className="card-img-top" 
        alt={product.name} 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <div className="card-body text-center">
        <h5 className="fw-bold text-dark">{product.name}</h5>
        <p className="text-primary fw-bold fs-5 mb-3">₹{product.price}</p>
        
        <button 
          className="btn btn-warning w-100 rounded-pill fw-bold"
          onClick={(e) => {
            e.stopPropagation(); // Prevents opening the details page when clicking "Add to Cart"
            addToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Productcard;