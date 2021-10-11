const express = require("express");
const exchangeController = require("../controller/exchangeController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", authenticate, exchangeController.getAllExchange);
router.get("/:id", authenticate, exchangeController.getExchangeById);
router.post("/", authenticate, exchangeController.createExchange);
router.put("/:id", authenticate, exchangeController.updateExchange);
router.delete("/:id", authenticate, exchangeController.deleteExchange);
module.exports = router;
