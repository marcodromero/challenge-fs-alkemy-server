const sequelize = require("sequelize");
const Category= require("../models/category");
const Operation = require("../models/operation");

class OperationsService{
  
 getOperations = async (query) => {
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

getOperation = async ({ userId, operationId }) => {
  const operation = await Operation.findOne({
    where: {
      id: operationId,
      userId,
    },
  });

  return operation;
};

createOperation = async ({
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

 updateOperation = async ({ userId, operationId, data }) => {
  const operationUpdated = await Operation.update(data, {
    where: {
      id: operationId,
      userId,
    },
    individualHooks: true,
  });

  return operationUpdated;
};

deleteOperation = async (operationId) => {
  const operation = await Operation.findByPk(operationId);
  operation.destroy();
  return operation;
};

}

module.exports = OperationsService;
