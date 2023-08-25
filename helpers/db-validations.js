const Operation = require("../models/operation");

const operationExist = async (id) => {
  try {
    const operation = await Operation.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!operation) {
      throw new Error(`There is no operation with the ID: ${id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { operationExist };
