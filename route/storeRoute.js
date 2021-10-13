const express = require("express");
const storeContoller = require("../controller/storeController");
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

router.get("/", storeContoller.getAllStore);
router.get("/:id", authenticate, storeContoller.getStoreById);
router.post(
  "/",
  authenticate,
  upload.single("thisisinput"),
  storeContoller.createStore
);
router.put(
  "/:id",
  authenticate,
  upload.single("thisisinput"),
  storeContoller.updateStore
);
router.delete("/:id", authenticate, storeContoller.deleteStore);
module.exports = router;
