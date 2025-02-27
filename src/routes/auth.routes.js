const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'Auth service is running' });
});

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticate, authController.getProfile);

module.exports = router; 