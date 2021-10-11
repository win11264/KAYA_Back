const express = require("express");
const wasteController = require("../controller/wasteController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", wasteController.getAllWastes);
router.get("/:id", authenticate, wasteController.getWasteById);
router.post("/", authenticate, wasteController.createWaste);
router.put("/:id", authenticate, wasteController.updateList);
router.delete("/:id", authenticate, wasteController.deleteWaste);
module.exports = router;
