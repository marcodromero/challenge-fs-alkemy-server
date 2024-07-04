const { validateFields } = require("../middlewares/validate-fields");
const { body } = require("express-validator");

const registerValidator = [
  body("email", "El campo email no debe quedar vacio.").not().isEmpty(),
  body("email", "El email proporcionado no tiene un formato valido.").isEmail(),
  body("password", "El campo contraseña no debe quedar vacio.").not().isEmpty(),
  body("password", "La contraseña debe contener al menos 8 caracteres").isLength({ min: 8 }),
  validateFields,
];

const signInValidator = [
  body("email", "El campo email no debe quedar vacio.").not().isEmpty(),
  body("email", "El email proporcionado no tiene un formato valido.").isEmail(),
  body("password", "El campo contraseña no debe estar vacio.").not().isEmpty(),
  validateFields,
];

module.exports = { registerValidator, signInValidator };
