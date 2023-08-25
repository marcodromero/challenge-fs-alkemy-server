const { Router } = require("express");
const { googleSignIn } = require("../controllers/auth");
const { googleSignInValidator } = require("../validations/auth");

const router = Router();

router.post("/google", googleSignInValidator, googleSignIn);

module.exports = router;
