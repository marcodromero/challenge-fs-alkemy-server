const { validateJWT } = require("../middlewares/validate-JWT");

const getBalanceValidation = [validateJWT];

module.exports = { getBalanceValidation };
