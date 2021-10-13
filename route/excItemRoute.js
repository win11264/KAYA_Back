// const express = require("express");
// const exchangeItemController = require("../controller/exchangeItemController");
// const { authenticate } = require("../controller/authController");
// const multer = require("multer");

// const router = express.Router();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       console.log(file);
//       cb(null, "public/image");
//     },
//     filename: (req, file, cb) => {
//       cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
//     },
//   }),
// });

// router.get("/", authenticate, exchangeItemController.getAllExcItem);
// router.get("/:id", authenticate, exchangeItemController.getExcItemeById);
// router.post(
//   "/",
//   authenticate,
//   upload.single("thisisinput"),
//   exchangeItemController.createExcItem
// );
// router.put("/:id", authenticate, exchangeItemController.updateExcItem);
// router.delete("/:id", authenticate, exchangeItemController.deleteExcItem);
// module.exports = router;
