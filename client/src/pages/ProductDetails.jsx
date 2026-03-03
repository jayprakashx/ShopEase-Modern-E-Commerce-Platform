import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        if (data) setProduct(data);
        else setError(true);
      } catch (err) {
        setError(true);
      }
    };
    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">Could not load product details.</h2>
        <Link to="/" className="btn btn-warning mt-3">Back to Home</Link>
      </div>
    );
  }

  if (!product) return <div className="text-center mt-5">Loading details...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} className="img-fluid rounded border shadow-sm" alt={product.name} />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <h3 className="text-danger mt-3">₹{product.price}</h3>
          <p className="mt-4">{product.description || "High-quality electronics from ShopEase."}</p>
          <button className="btn btn-warning btn-lg w-100 mt-4 rounded-pill fw-bold">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;