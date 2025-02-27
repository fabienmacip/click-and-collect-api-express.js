const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/auth');
const User = require('../models/user.model');
const logger = require('../utils/logger');

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtConfig.secret);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] } // Don't send password
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if user is verified (optional, based on your needs)
    if (!user.is_verified) {
      return res.status(403).json({ message: 'Please verify your email first' });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(`Unauthorized access attempt by user ${req.user.id} with role ${req.user.role}`);
      return res.status(403).json({ 
        message: 'Not authorized to access this resource'
      });
    }

    next();
  };
};

// Helper middleware for specific roles
exports.isAdmin = exports.authorize('admin', 'super-admin');
exports.isSuperAdmin = exports.authorize('super-admin');
exports.isCustomer = exports.authorize('customer'); 