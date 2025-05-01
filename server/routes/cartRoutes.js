
const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Sync cart with server
router.post('/sync', auth, async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items) {
      return res.status(400).json({ message: 'Items are required' });
    }
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Process items
    const cartItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.product.id);
      
      if (product) {
        cartItems.push({
          product: product._id,
          quantity: Math.min(item.quantity, product.inventory) // Ensure quantity doesn't exceed inventory
        });
      }
    }
    
    // Update user's cart
    user.cart = { items: cartItems };
    await user.save();
    
    res.json({ message: 'Cart synced successfully' });
  } catch (error) {
    console.error('Sync cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart.items.product');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ cart: user.cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
