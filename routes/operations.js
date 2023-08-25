const { Router } = require("express");

const {
  createOperation,
  getOperations,
  updateOperation,
  deleteOperation,
  getOperation,
} = require("../controllers/operations");

const {
  createOperationValidation,
  updateOperationValidation,
  deleteOperationValidation,
  getOperationsValidation,
  getOperationValidation,
} = require("../validations/operations");

const router = Router();

router.get("/", getOperationsValidation, getOperations);
router.get("/:id", getOperationValidation, getOperation);
router.post("/", createOperationValidation, createOperation);
router.put("/:id", updateOperationValidation, updateOperation);
router.delete("/:id", deleteOperationValidation, deleteOperation);

module.exports = router;
