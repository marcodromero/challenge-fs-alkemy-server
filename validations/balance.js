const { validateJWT } = require("../middlewares/validate-JWT");

const getAllValidation = [validateJWT];

module.exports = { getAllValidation };
