const express = require('express');
const router = express.Router(); // This line MUST be here to define "router"
const Order = require('../models/Order');

// POST: Place a new order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order Save Error:", err);
    res.status(500).json({ message: "Failed to save order" });
  }
});

// GET: Fetch order history for the user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch History Error:", err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

module.exports = router;