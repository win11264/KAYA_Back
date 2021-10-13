const express = require("express");
const userController = require("../controller/userController");
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

router.get(
  "/",
  authenticate,
  upload.single("thisisinput"),
  userController.getAllUser
);
router.get(
  "/:id",
  authenticate,
  upload.single("thisisinput"),
  userController.getUserById
);

router.put(
  "/:id",
  authenticate,
  upload.single("thisisinput"),
  userController.updateUser
);
router.delete("/:id", authenticate, userController.deleteUser);
module.exports = router;
