import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [newProduct, setNewProduct] = useState({ 
    name: '', price: '', description: '', category: '', image: '' 
  });

  // 1. Fetch products from MongoDB
  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Handle Save or Update
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = { ...newProduct, stock: 10 }; 

     if (editingId) {
     console.log("🔵 Editing ID:", editingId);
     console.log("🟢 Payload being sent:", productData);

      await API.put(`/products/${editingId}`, productData);
     alert("Product Updated Successfully!");
     } else {
      await API.post('/products', productData);
     alert("Product Added Successfully!");
    }
      // Reset form and ID
      setNewProduct({ name: '', price: '', description: '', category: '', image: '' });
      setEditingId(null);
      fetchProducts(); 
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Failed to save"));
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  // 4. Fill form for Editing - FIXED to prevent "poisoned data"
  const startEdit = (product) => {
    // We explicitly set ONLY the fields needed by the form
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });
    // Store the database ID separately
    setEditingId(product._id);
    window.scrollTo(0, 0); 
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-dark">Admin Dashboard</h2>
      
      {/* Statistics Cards */}
      <div className="row mb-5 g-4 text-white text-center">
        <div className="col-md-4">
          <div className="p-4 rounded-3 shadow bg-primary border-0">
            <h6 className="text-uppercase small fw-bold">Total Products</h6>
            <h2 className="display-6 fw-bold">{products.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 rounded-3 shadow bg-warning text-dark border-0">
            <h6 className="text-uppercase small fw-bold">Total Orders</h6>
            <h2 className="display-6 fw-bold">56</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 rounded-3 shadow bg-success border-0">
            <h6 className="text-uppercase small fw-bold">Total Users</h6>
            <h2 className="display-6 fw-bold">134</h2>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Form */}
      <div className="bg-white p-4 rounded-3 shadow-sm border mb-5">
        <h5 className="fw-bold mb-4 text-primary">
          {editingId ? "Edit Product" : "Add New Product"}
        </h5>
        <form onSubmit={handleSaveProduct} className="row g-3">
          <div className="col-md-4">
            <label className="form-label small fw-bold">Product Name</label>
            <input type="text" className="form-control" value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold">Price ($)</label>
            <input type="number" className="form-control" value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold">Category</label>
            <input type="text" className="form-control" value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} required />
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Image URL</label>
            <input type="text" className="form-control" value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} required />
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Description</label>
            <textarea className="form-control" rows="2" value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} required></textarea>
          </div>
          <div className="col-12 mt-4 text-end">
            {editingId && (
                <button type="button" className="btn btn-secondary me-2 px-4 fw-bold" 
                        onClick={() => {setEditingId(null); setNewProduct({name:'', price:'', description:'', category:'', image:''})}}>
                    Cancel
                </button>
            )}
            <button type="submit" className={`btn ${editingId ? 'btn-primary' : 'btn-success'} px-5 shadow-sm fw-bold`}>
              {editingId ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>

      {/* Product Management Table */}
      <div className="bg-white p-4 rounded-3 shadow-sm border">
        <h5 className="mb-3 fw-bold">Manage Products</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="fw-bold">{product.name}</td>
                  <td className="text-primary fw-semibold">${product.price}</td>
                  <td><span className="badge bg-info text-dark">{product.category}</span></td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(product)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;