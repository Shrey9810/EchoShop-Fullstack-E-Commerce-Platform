
const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { generateOrderId } = require('../utils');

const router = express.Router();

// Get all orders for the current user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
      
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.userId
    }).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain items' });
    }

    // Calculate total and verify inventory
    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      
      if (product.inventory < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough inventory for ${product.name}. Available: ${product.inventory}` 
        });
      }
      
      const itemPrice = product.price * item.quantity;
      totalAmount += itemPrice;
      
      processedItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
      
      // Update inventory
      product.inventory -= item.quantity;
      await product.save();
    }
    
    // Create the order
    const order = new Order({
      user: req.userId,
      items: processedItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      orderId: generateOrderId()
    });
    
    await order.save();
    
    // Add order to user's orders
    await User.findByIdAndUpdate(req.userId, {
      $push: { orders: order._id }
    });
    
    // Return the populated order
    const populatedOrder = await Order.findById(order._id).populate('items.product');
    
    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel order (if still pending)
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.userId,
      status: 'pending' // Can only cancel pending orders
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found or cannot be cancelled' });
    }
    
    // Update order status
    order.status = 'cancelled';
    await order.save();
    
    // Restore inventory
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { inventory: item.quantity }
      });
    }
    
    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
