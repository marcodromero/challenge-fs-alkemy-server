const { DataTypes } = require("sequelize");
const db = require("../database/db-config");
const Balance = require("./balance");
const Category = require("./category");

const Operation = db.define("Operation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    required: true,
    enum: ["egreso", "ingreso"],
    allowNull: false,
  },
  concept: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    required: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    required: true,
    allowNull: false,
  },
});

const createBalance = async (operation) => {
  const { userId } = operation;

  let amount = await Operation.sum("amount", {
    where: {
      userId,
    },
  });

  const date = new Date();

  await Balance.create({ amount, userId, date });
};

Operation.afterCreate(createBalance);

Operation.afterDestroy(createBalance);

Operation.afterUpdate((operation) => {
  if (operation.changed("amount")) {
    createBalance(operation);
  }
});

module.exports = Operation;
