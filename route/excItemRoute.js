const express = require("express");
const exchangeItemController = require("../controller/exchangeItemController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", authenticate, exchangeItemController.getAllExcItem);
router.get("/:id", authenticate, exchangeItemController.getExcItemeById);
router.post("/", authenticate, exchangeItemController.createExcItem);
router.put("/:id", authenticate, exchangeItemController.updateExcItem);
router.delete("/:id", authenticate, exchangeItemController.deleteExcItem);
module.exports = router;
