const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");

router.get("/", loginController.index);
router.post("/login", loginController.login);

module.exports = router;
