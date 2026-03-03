import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Productcard from '../components/Productcard';
import ProductSlider from '../components/ProductSlider'; //

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* 1. Search Bar */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control rounded-pill shadow-sm py-2"
            placeholder="Search for electronics (e.g. iPhone, MacBook)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Professional Moving Slider */}
      {!searchTerm && (
        <div className="mb-5">
          <ProductSlider />
        </div>
      )}

      {/* 3. Product Grid */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <Productcard product={product} />
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h3 className="text-muted">No products found for "{searchTerm}"</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;