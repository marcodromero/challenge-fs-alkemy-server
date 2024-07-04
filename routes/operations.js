const { Router } = require("express");
const { operationsController } = require("../controllers");
const { operationsValidations } = require("../validations");

const router = Router();
router.get("/", operationsValidations.getAllValidation, operationsController.getAllOperations);
router.get("/:id", operationsValidations.getByIdValidation, operationsController.getOperationById);
router.post("/", operationsValidations.createValidation, operationsController.createOperation);
router.put("/:id", operationsValidations.updateValidation, operationsController.updateOperation);
router.delete("/:id", operationsValidations.deleteValidation, operationsController.deleteOperation);

module.exports = router;
