const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const ProductImage = sequelize.define(
  "ProductImage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_index: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
  },
  {
    tableName: "product_images",
    timestamps: true,
  }
);

module.exports = ProductImage;
