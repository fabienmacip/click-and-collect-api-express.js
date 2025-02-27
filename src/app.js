require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errorHandler } = require("./utils/errorHandler");
const logger = require("./utils/logger");
const { connectDB } = require("./config/database");
const initializeDatabase = require("./config/init-db");
const authRoutes = require('./routes/auth.routes');
const { publicRoutes: adminPublicRoutes, protectedRoutes: adminProtectedRoutes } = require('./routes/admin.routes');
const customerRoutes = require('./routes/customer.routes');
const { authenticate, isAdmin } = require('./middleware/auth.middleware');

require("dotenv").config();

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 900000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX || 100,
});
app.use("/api", limiter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// API routes will be added here
app.use(`/api/${process.env.API_VERSION || "v1"}`, (req, res) => {
  res.status(200).json({ message: "API is working" });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminPublicRoutes);
app.use('/api/customer', customerRoutes);

// Protected routes
app.use('/api/admin', isAdmin, adminProtectedRoutes);
app.use('/api/customer', authenticate, customerRoutes);

// Debug middleware - log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Error handling
app.use((err, req, res, next) => {
  logger.error('Global error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;

// Database initialization and server start
const startServer = async () => {
  try {
    await connectDB();

    // Set force: true only if you want to recreate all tables
    // WARNING: This will delete all existing data
    await initializeDatabase(false);

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
