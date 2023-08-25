const { DataTypes } = require("sequelize");
const db = require("../database/db-config");

const Balance = db.define("Balance", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    required: true,
  },
  date: {
    type: DataTypes.DATE,
  },
});

module.exports = Balance;
