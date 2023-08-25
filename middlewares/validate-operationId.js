const Operation = require("../models/operation");

const validateOperationId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const operationId = req.params.id;

    const operation = await Operation.findOne({
      where: {
        id: operationId,
        userId,
      },
    });

    if (!operation) {
      throw new Error(`There is no operation with the ID: ${id}`);
    }
    req.operation = operation;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { validateOperationId };
