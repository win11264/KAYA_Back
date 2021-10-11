const express = require("express");
const addressController = require("../controller/addressController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", authenticate, addressController.getAllAddress);
router.get("/:id", authenticate, addressController.getAddressById);
router.post("/", authenticate, addressController.createAdress);
router.put("/:id", authenticate, addressController.updateAddress);
router.delete("/:id", authenticate, addressController.deleteAddress);
module.exports = router;
