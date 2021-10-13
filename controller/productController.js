const { Product } = require("../models");
const utils = require("util");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const express = require("express");
const app = express();
const uploadPromise = utils.promisify(cloudinary.uploader.upload);

exports.getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.findAll();
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, amount, information, image, storeId } = req.body;

    // if (
    //   req.user.username === "admin01" ||
    //   req.user.username === "admin02" ||
    //   req.user.username === "admin03"
    // ) {
    const result = await uploadPromise(req.file.path);
    const product = await Product.create({
      name,
      price: +price,
      amount: +amount,
      information,
      image: result.secure_url,
      storeId: +storeId,
    });
    fs.unlinkSync(req.file.path);
    res.status(201).json({ product });
    // }
    // return res.status(401).json({ message: "you are unauthorized" });
  } catch (err) {
    next(err.message);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, amount, information, image, storeId } = req.body;
    const result = await uploadPromise(req.file.path);
    const [rows] = await Product.update(
      {
        name,
        price: +price,
        amount: +amount,
        information,
        image: result.secure_url,
        storeId: +storeId,
      },
      {
        where: {
          id,
        },
      }
    );
    fs.unlinkSync(req.file.path);
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update product" });
    }

    res.status(200).json(result.secure_url);
  } catch (err) {
    next(err.message);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (
      req.user.username === "admin01" ||
      req.user.username === "admin02" ||
      req.user.username === "admin03"
    ) {
      const rows = await Product.destroy({
        where: {
          id,
        },
      });
      console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: "fail to delete product" });
      }

      res.status(204).json({ message: "Delete Successfully" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (err) {
    next(err);
  }
};
