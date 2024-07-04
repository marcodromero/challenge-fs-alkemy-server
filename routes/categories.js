const { Router } = require("express");
const { categoriesController } = require("../controllers");

const router = Router();
router.get("/", categoriesController.getCategories);

module.exports = router;
