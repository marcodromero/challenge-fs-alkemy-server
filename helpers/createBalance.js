const db = require("../database/db-config");
const Balance = require("../models/balance");
const Operation = require("../models/operation");

const createBalance = async (operation) => {
  const { userId , date = null } = operation;
  let amount = await db.models.Operation.sum("amount", {
    where: {
      userId,
    },
  });

  date
  ? await Balance.create({ amount, userId, date})
  : await Balance.create({ amount, userId})  
};

module.exports = { createBalance };