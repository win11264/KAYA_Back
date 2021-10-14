const { Transaction, TransactionItem, Product } = require("../models");
const utils = require("util");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

exports.createTransactionItem = async (req, res, next) => {
  try {
    const { amount, total, transactionId, productId } = req.body;
    const TransItem = await Product.findOne({ where: { id: productId } });
    if (amount === 0) {
      return res.status(400).json({ message: "value is not found" });
    }
    res.status(201).json({ message: "create Successfully" });
  } catch (error) {
    next(error);
  }
};
