const Balance = require("../models/balance");
const sequelize = require("sequelize");

const getBalance = async (req, res) => {
  const { id } = req.user;

  const balance = await Balance.findAll({
    where: {
      userId: id,
    },
    attributes: [
      "id",
      "amount",
      [sequelize.fn("date_format", sequelize.col("date"), "%d-%m-%Y"), "date"],
    ],
    limit: 10,
    order: [["id", "DESC"]],
  });

  res.json(balance);
};

module.exports = {
  getBalance,
};
