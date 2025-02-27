require("dotenv").config();
const { connectDB } = require("../config/database");
const logger = require("../utils/logger");

const testConnection = async () => {
  try {
    logger.info("Testing database connection...");
    await connectDB();
    logger.info("Test completed successfully!");
    process.exit(0);
  } catch (error) {
    logger.error("Connection test failed:", error);
    process.exit(1);
  }
};

testConnection();
