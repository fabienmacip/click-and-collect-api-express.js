require("dotenv").config();
const initializeDatabase = require("../config/init-db");
const logger = require("../utils/logger");

const resetDatabase = async () => {
  try {
    logger.warn("Starting database reset...");
    await initializeDatabase(true);
    logger.info("Database reset completed successfully");
    process.exit(0);
  } catch (error) {
    logger.error("Error resetting database:", error);
    process.exit(1);
  }
};

resetDatabase();
