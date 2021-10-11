// const { sequelize } = require("./models");
// sequelize.sync({ force: false });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const utils = require("util");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const authRoute = require("./route/authRoute");
const wasteRoute = require("./route/wasteRoute");
const errorController = require("./controller/errorController");
const storeRoute = require("./route/storeRoute");
const productRoute = require("./route/productRoute");
const excItemRoute = require("./route/excItemRoute");
const exchangeRoute = require("./route/exchangeRoute");
const addressRoute = require("./route/addressRoute");
const userRoute = require("./route/userRoute");

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));
app.use("/user", authRoute);
app.use("/waste", wasteRoute);
app.use("/store", storeRoute);
app.use("/product", productRoute);
app.use("/excitem", excItemRoute);
app.use("/exchange", exchangeRoute);
app.use("/address", addressRoute);
app.use("/userdetail", userRoute);

app.use(errorController);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(file);
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

app.post(
  "/upload-to-cloud",
  upload.single("cloudinput"),
  async (req, res, next) => {
    console.log(req.file);
    const { username, password, email, confirmPassword } = req.body;

    try {
      const result = await uploadPromise(req.file.path);
      const user = await User.create({
        username,
        password: result.secure_url,
        email,
      });
      fs.unlinkSync(req.file.path);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

const port = process.env.PORT || 8000;
console.log(process.env.PORT);
app.listen(port, () => console.log(`server running on port ${port}`));
