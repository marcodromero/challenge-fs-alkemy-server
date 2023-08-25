const { validateFields } = require("../middlewares/validate-fields");
const { body } = require("express-validator");

const googleSignInValidator = [
  body("id_token", "id_token is required").not().isEmpty(),
  validateFields,
];

module.exports = { googleSignInValidator };
