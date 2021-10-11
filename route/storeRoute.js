const express = require("express");
const storeContoller = require("../controller/storeController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", storeContoller.getAllStore);
router.get("/:id", authenticate, storeContoller.getStoreById);
router.post("/", authenticate, storeContoller.createStore);
router.put("/:id", authenticate, storeContoller.updateStore);
router.delete("/:id", authenticate, storeContoller.deleteStore);
module.exports = router;
