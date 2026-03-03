const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  // Links the order to the specific user ID
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // Stores the array of products from the cart
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      _id: { type: String, required: true }
    }
  ],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    default: 'Processing' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Order', OrderSchema);