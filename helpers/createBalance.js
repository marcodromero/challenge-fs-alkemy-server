const Operation = require("../models/operation");

const createBalance = async (operation) => {
  const { userId } = operation;
  let amount = await Operation.sum("amount", {
    where: {
      userId,
    },
  });

  await Balance.create({ amount, userId: id });
};

module.exports = { createBalance };
