const { Router } = require("express");
const { getBalance } = require("../controllers/balance");
const { getBalanceValidation } = require("../validations/balance");

const router = Router();

router.get("/", getBalanceValidation, getBalance);

module.exports = router;
