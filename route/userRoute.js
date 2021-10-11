const express = require("express");
const userController = require("../controller/userController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", authenticate, userController.getAllUser);
router.get("/:id", authenticate, userController.getUserById);

router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);
module.exports = router;
