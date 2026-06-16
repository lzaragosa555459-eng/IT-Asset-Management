const express = require("express");
const router = express.Router();

const assetController = require("../controllers/assetController");

router.get("/", assetController.index);

router.get("/add", assetController.create);
router.post("/store", assetController.store);

router.get("/edit/:id", assetController.edit);
router.post("/update/:id", assetController.update);

router.get("/delete/:id", assetController.destroy);

module.exports = router;