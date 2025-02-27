const { sequelize } = require("./database");
const logger = require("../utils/logger");
require("../models"); // This loads all models and their relationships

const initializeDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    logger.info("Database synchronized successfully");

    if (force) {
      logger.warn(
        "Database was force synchronized. All existing data was wiped."
      );
    }
  } catch (error) {
    logger.error("Error synchronizing database:", error);
    throw error;
  }
};

module.exports = initializeDatabase;
