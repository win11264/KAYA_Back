const { Store } = require("../models");
const utils = require("util");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const express = require("express");

const app = express();

exports.getAllStore = async (req, res, next) => {
  try {
    const store = await Store.findAll();
    res.json({ store });
  } catch (error) {
    next(error);
  }
};

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

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

exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await Store.findOne({ where: { id } });
    res.json({ store });
  } catch (error) {
    next(error);
  }
};

// (upload.single("thisisinput"),

exports.createStore = async (req, res, next) => {
  try {
    const { name, address, contact, hashtag, image } = req.body;
    if (
      req.user.username === "admin01" ||
      req.user.username === "admin02" ||
      req.user.username === "admin03"
    ) {
      const result = await uploadPromise(req.file.path);
      const uploaded = await Store.create({
        name,
        address,
        contact,
        hashtag,
        image: result.secure_url,
      });

      fs.unlinkSync(req.file.path);
      res.json({ uploaded });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error);
  }
};

exports.updateStore = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, address, contact, hashtag, image } = req.body;

    if (
      req.user.username === "admin01" ||
      req.user.username === "admin02" ||
      req.user.username === "admin03"
    ) {
      const result = await uploadPromise(req.file.path);
      const [rows] = await Store.update(
        {
          name,
          address,
          contact,
          hashtag,
          image: result.secure_url,
        },
        { where: { id } }
      );
      fs.unlinkSync(req.file.path);
      // res.json({ message: "update successful" });
      if (rows === 0) {
        return res.status(400).json({ message: "fail to update store" });
      }
      console.log("----------", result.secure_url);
      res.status(200).json(result.secure_url);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteStore = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (
      req.user.username === "admin01" ||
      req.user.username === "admin02" ||
      req.user.username === "admin03"
    ) {
      const rows = await Store.destroy({
        where: {
          id,
        },
      });
      console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: "fail to delete waste" });
      }

      res.status(204).json({ message: "Delete Successfully" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (err) {
    next(err);
  }
};
