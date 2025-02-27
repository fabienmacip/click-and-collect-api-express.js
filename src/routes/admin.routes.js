const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

// Public routes
router.get('/health', (req, res) => {
  res.json({ status: 'Admin service is running' });
});

// Protected routes
const protectedRouter = express.Router();
protectedRouter.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

protectedRouter.post('/settings', (req, res) => {
  res.json({ message: 'Super admin settings' });
});

module.exports = { 
  publicRoutes: router,
  protectedRoutes: protectedRouter
}; 