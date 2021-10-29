const express = require("express");
const transactionController = require("../controller/transactionController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.post("/", authenticate, transactionController.createTransaction);

router.get("/", authenticate, transactionController.getAllTransaction);

module.exports = router;
