const express = require("express");
const exchangeController = require("../controller/exchangeController");
const { authenticate } = require("../controller/authController");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, "public/image");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
    },
  }),
});

router.get("/", authenticate, exchangeController.getAllExchange);
router.get("/:id", authenticate, exchangeController.getExchangeById);
router.post(
  "/",
  authenticate,
  upload.single("thisisinput"),
  exchangeController.createExchange
);
router.put("/:id", authenticate, exchangeController.updateExchange);
router.delete("/:id", authenticate, exchangeController.deleteExchange);
module.exports = router;
