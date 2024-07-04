const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { body } = require("express-validator");

const createValidation = [
  validateJWT,
  body("amount", "El monto no debe quedar vacio.").notEmpty(),
   body("amount", "El monto no tiene un valor valido.").isDecimal(),
  body("date", "La fecha no es valida").isDate(),
  body("concept", "El concepto no es valido.").notEmpty().isLength({ max: 50 }),
  body("type", "El tipo no es valido.").isIn(["egreso", "ingreso"]),
  body("categoryId", "La categoría no es valida.").notEmpty(),
  validateFields,
];

const updateValidation = [
  validateJWT,
  body("amount", "El monto no es valido.").isDecimal(),
  body("date", "La fecha no es valida").isDate(),
  body("concept", "El concepto no es valido.").isLength({ max: 50, min: 1 }),
  validateFields,
];

const deleteValidation = [
  validateJWT,
  validateFields,
];

const getAllValidation = [validateJWT];

const getByIdValidation = [validateJWT];

module.exports = {
  createValidation,
  updateValidation,
  deleteValidation,
  getByIdValidation,
  getAllValidation,
};
