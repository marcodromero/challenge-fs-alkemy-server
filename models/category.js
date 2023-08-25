const { DataTypes } = require("sequelize");
const db = require("../database/db-config");
const Operation = require("./operation");

const Category = db.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
  },
});

Operation.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Operation, { foreignKey: "categoryId" });

module.exports = Category;
