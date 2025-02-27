const User = require("./user.model");
const Category = require("./category.model");
const Product = require("./product.model");
const ProductImage = require("./product-image.model");
const Order = require("./order.model");
const OrderItem = require("./order-item.model");

// We'll add Product and Order models later
// const Product = require('./product.model');
// const Order = require('./order.model');

// Define relationships here when we add other models
Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

Product.hasMany(ProductImage, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});
ProductImage.belongsTo(Product, { foreignKey: "product_id" });

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
  User,
  Category,
  Product,
  ProductImage,
  Order,
  OrderItem,
};
