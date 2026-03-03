const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // ✅ ADD THIS LINE

const app = express();

// Database Connection
connectDB(); 

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// Route Definitions
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes); // ✅ ADD THIS LINE (Must match Cart.jsx)

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));