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
// const excItemRoute = require("./route/excItemRoute");
const exchangeRoute = require("./route/exchangeRoute");
const addressRoute = require("./route/addressRoute");
const userRoute = require("./route/userRoute");
// const { ExchangeItem } = require("./models");
const { Product } = require("./models");
const { Store } = require("./models");

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));
app.use("/user", authRoute);
app.use("/waste", wasteRoute);
app.use("/store", storeRoute);
app.use("/product", productRoute);
// app.use("/excitem", excItemRoute);
app.use("/exchange", exchangeRoute);
app.use("/address", addressRoute);
app.use("/userdetail", userRoute);

app.use(errorController);

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

// app.post("/upload", upload.single("thisisinput"), async (req, res, next) => {
//   const { name, address, contact, hashtag, image } = req.body;
//   try {
//     const result = await uploadPromise(req.file.path);
//     const uploaded = await Store.create({
//       name,
//       address,
//       contact,
//       hashtag,
//       image: result.secure_url,
//     });
//     fs.unlinkSync(req.file.path);
//     res.json({ uploaded });
//   } catch (error) {
//     next(error);
//   }
//   //   try {
//   //     console.log("request File", req.file.path);
//   //     cloudinary.uploader.upload(req.file.path, async (err, result) => {
//   //       if (err) {
//   //         console.log(err);
//   //       } else {
//   //         console.log(result);
//   //       }
//   //       fs.unlinkSync(req.file.path);

//   //       const uploaded = await ExchangeItem.update(
//   //         { image: result.secure_url },
//   //         { where: { id: 1 } }
//   //       );
//   //       res.json({ uploaded });
//   //     });
//   //   } catch (error) {
//   //     next(error);
//   //   }
// });

const port = process.env.PORT || 8000;
console.log(process.env.PORT);
app.listen(port, () => console.log(`server running on port ${port}`));
