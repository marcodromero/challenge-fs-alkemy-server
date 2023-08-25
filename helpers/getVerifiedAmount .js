const getVerifiedAmount = ({ type, amount }) => {
  if (type == "egreso" && amount > 0) amount = amount * -1;
  if (type == "ingreso" && amount < 0) amount = amount * -1;

  return amount;
};

module.exports = { getVerifiedAmount };
