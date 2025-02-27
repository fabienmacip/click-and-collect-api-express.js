require("dotenv").config();
const { User, Category, Product } = require("../models");
const logger = require("../utils/logger");

const verifyData = async () => {
  try {
    logger.info("Checking database data...");

    // Check Users
    const users = await User.findAll();
    logger.info("\nUsers found:", users.length);
    users.forEach((user) => {
      logger.info(`- ${user.email} (${user.role})`);
    });

    // Check Categories
    const categories = await Category.findAll();
    logger.info("\nCategories found:", categories.length);
    categories.forEach((category) => {
      logger.info(`- ${category.name}: ${category.description}`);
    });

    // Check Products
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ["name"] }],
    });
    logger.info("\nProducts found:", products.length);
    products.forEach((product) => {
      logger.info(`- ${product.name} (${product.Category.name})`);
      logger.info(
        `  Price: $${product.price}, Stock: ${product.stock_quantity}`
      );
    });

    process.exit(0);
  } catch (error) {
    logger.error("Verification failed:", error);
    process.exit(1);
  }
};

verifyData();
