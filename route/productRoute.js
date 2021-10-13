const express = require("express");
const productController = require("../controller/productController");
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

router.get("/", productController.getAllProduct);
router.get("/:id", authenticate, productController.getProductById);
router.post(
  "/",
  authenticate,
  upload.single("thisisinput"),
  productController.createProduct
);
router.put(
  "/:id",
  authenticate,
  upload.single("thisisinput"),
  productController.updateProduct
);
router.delete("/:id", authenticate, productController.deleteProduct);
module.exports = router;
