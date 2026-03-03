const Product = require('../models/Product');

// Fetch all products for Home/Admin
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch a SINGLE product by its ID (Fixes the 404/Loading error)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found in database" });
    }
    
    res.json(product);
  } catch (err) {
    // Specifically handle invalid ID formats like extra characters
    if (err.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }
    res.status(500).json({ error: err.message });
  }
};

// Create a new product from Admin Dashboard
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};