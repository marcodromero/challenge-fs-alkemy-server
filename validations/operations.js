const { operationExist } = require("../helpers/db-validations");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { body, param } = require("express-validator");
const { validateOperationId } = require("../middlewares/validate-operationId");

const createOperationValidation = [
  validateJWT,
  body("amount", "El monto no es valido.").isDecimal().notEmpty(),
  body("date", "La fecha no es valida").isDate(),
  body("concept", "El concepto no es valido.").notEmpty().isLength({ max: 50 }),
  body("type", "El tipo no es valido.").isIn(["egreso", "ingreso"]),
  body("categoryId", "La categoría no es valida.").notEmpty(),
  validateFields,
];

const updateOperationValidation = [
  validateJWT,
  validateOperationId,
  body("amount", "El monto no es valido.").isDecimal(),
  body("date", "La fecha no es valida").isDate(),
  body("concept", "El concepto no es valido.").isLength({ max: 50, min: 1 }),
  validateFields,
];

const deleteOperationValidation = [
  validateJWT,
  validateOperationId,
  validateFields,
];

const getOperationsValidation = [validateJWT];

const getOperationValidation = [validateJWT];

module.exports = {
  createOperationValidation,
  updateOperationValidation,
  deleteOperationValidation,
  getOperationValidation,
  getOperationsValidation,
};
