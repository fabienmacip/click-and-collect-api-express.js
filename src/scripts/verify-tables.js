require("dotenv").config();
const { sequelize } = require("../config/database");
const logger = require("../utils/logger");

const verifyTables = async () => {
  try {
    logger.info("Checking database tables...");

    // Query to show all tables
    const [tables] = await sequelize.query("SHOW TABLES");

    logger.info("Found tables:");
    tables.forEach((table) => {
      logger.info(`- ${Object.values(table)[0]}`);
    });

    process.exit(0);
  } catch (error) {
    logger.error("Verification failed:", error);
    process.exit(1);
  }
};

verifyTables();
