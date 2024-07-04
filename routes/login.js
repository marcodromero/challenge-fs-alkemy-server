const { Router } = require("express");
const { loginController } = require("../controllers");
const { loginValidations } = require("../validations");

const router = Router();

router.post("/register",loginValidations.registerValidator, loginController.registerUser);
router.post("/signin",loginValidations.signInValidator, loginController.signIn);
router.post("/validate-token",loginController.validateToken);

module.exports = router;
