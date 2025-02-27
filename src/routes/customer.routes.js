const express = require('express');
const { isCustomer } = require('../middleware/auth.middleware');
const router = express.Router();

// Add at the top of your routes
router.get('/health', (req, res) => {
  res.json({ status: 'Customer service is running' });
});

// Only customers can access
router.get('/orders', isCustomer, (req, res) => {
  res.json({ message: 'Customer orders' });
});

module.exports = router; 