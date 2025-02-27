require("dotenv").config();
const bcrypt = require("bcryptjs");
const { User, Category, Product } = require("../models");
const logger = require("../utils/logger");

const seedData = async () => {
  try {
    // Create users
    const users = await User.bulkCreate([
      {
        email: "super@admin.com",
        password: await bcrypt.hash("password123", 10),
        role: "super-admin",
        is_verified: true,
      },
      {
        email: "newuser@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "customer",
        is_verified: true,
      }
    ]);
    logger.info(`Created ${users.length} users:`, users.map(u => u.email).join(', '));

    // Create some categories
    const categories = await Category.bulkCreate([
      {
        name: "Electronics",
        description: "Electronic devices and accessories",
      },
      {
        name: "Books",
        description: "Physical and digital books",
      },
      {
        name: "Clothing",
        description: "Men and women clothing",
      },
    ]);
    logger.info(`Created ${categories.length} categories`);

    // Create some products
    const products = await Product.bulkCreate([
      {
        name: "Laptop Pro",
        description: "High-performance laptop",
        price: 999.99,
        stock_quantity: 10,
        category_id: categories[0].id,
      },
      {
        name: "JavaScript Guide",
        description: "Complete guide to JavaScript",
        price: 29.99,
        stock_quantity: 50,
        category_id: categories[1].id,
      },
      {
        name: "Winter Jacket",
        description: "Warm winter jacket",
        price: 89.99,
        stock_quantity: 20,
        category_id: categories[2].id,
      },
    ]);
    logger.info(`Created ${products.length} products`);

    logger.info("Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    logger.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
