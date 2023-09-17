const Category = require("../models/category");
const Operation = require("../models/operation");
const sequelize = require("sequelize");

const getOperations = async (query) => {
  const operations = await Operation.findAll({
    include: [
      {
        model: Category,
        attributes: ["name"],
        where: { id: sequelize.col("operation.categoryId") },
      },
    ],
    where: query,
    order: [
      ["date", "DESC"],
      ["id", "DESC"],
    ],
    attributes: [
      "id",
      "type",
      "concept",
      "amount",
      "categoryId",
      [sequelize.fn("date_format", sequelize.col("date"), "%d-%m-%Y"), "date"],
    ],
  });
  return operations;
};

const getOperation = async ({ userId, operationId }) => {
  const operation = await Operation.findOne({
    where: {
      id: operationId,
      userId,
    },
  });

  return operation;
};

const createOperation = async ({
  type,
  concept,
  amount,
  date,
  userId,
  categoryId,
}) => {
  return await Operation.create({
    type,
    concept,
    amount,
    date,
    userId,
    categoryId,
  });
};

const updateOperation = async ({ userId, operationId, data }) => {
  const operationUpdated = await Operation.update(data, {
    where: {
      id: operationId,
      userId,
    },
    individualHooks: true,
  });

  return operationUpdated;
};

const deleteOperation = async (operationId) => {
  const operation = await Operation.findByPk(operationId);
  operation.destroy();
  return operation;
};

module.exports = {
  getOperation,
  getOperations,
  createOperation,
  updateOperation,
  deleteOperation,
};
