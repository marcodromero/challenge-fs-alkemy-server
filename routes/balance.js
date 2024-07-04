const { Router } = require("express");
const { balanceController } = require("../controllers");
const { balanceValidation } = require("../validations");

const router = Router();
router.get("/", balanceValidation.getAllValidation, balanceController.getAllBalance);

module.exports = router;
