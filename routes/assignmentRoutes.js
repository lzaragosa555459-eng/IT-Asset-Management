const express = require("express");
const router = express.Router();

const assignmentController = require("../controllers/assignmentController");

router.get("/", assignmentController.index);

router.post("/store", assignmentController.store);

router.post("/return/:id", assignmentController.returnAsset);

module.exports = router;