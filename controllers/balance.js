const { BalanceService } = require("../services");
const { catchedAsync, response} = require("../helpers");
const balanceService = new BalanceService();

const getAllBalance = async (req, res) => {
  const { id } = req.user;
  const balance = await balanceService.getAllBalance(id);
  response(res, 200, balance);
};

module.exports = {
  getAllBalance: catchedAsync(getAllBalance),
};


