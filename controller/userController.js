const { User, Transaction, Exchange, Sequelize } = require("../models");
const utils = require("util");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const express = require("express");

const app = express();

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

exports.getAllUser = async (req, res, next) => {
  try {
    const userDetail = await User.findOne({
      where: { username: req.user.username },
    });
    console.log("--- userDetail ---", userDetail);
    res.json({ userDetail });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userBalance = await User.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: Transaction,
          attributes: ["value"],
        },
        {
          model: Exchange,
          attributes: ["value"],
        },
      ],
    });

    console.log(JSON.stringify(userBalance.Exchanges, null, 2));

    const totalExc = userBalance.Exchanges.reduce(
      (prv, curr) => prv + curr.value,
      0
    );

    const totalTrans = userBalance.Transactions.reduce(
      (prv, curr) => prv + curr.value,
      0
    );

    userBalance.balance = totalExc - totalTrans;

    console.log(userBalance.balance);

    res.status(200).json({ userBalance });
  } catch (error) {}
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const { id } = req.params;
    const { firstName, lastName, birthDate, email, mobileNo, address } =
      req.body;

    let result;

    if (req.file) {
      result = await uploadPromise(req.file.path);
    }

    const user = await User.findOne({ where: { id: req.user.id } });
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthDate = birthDate;
    user.email = email;
    user.mobileNo = mobileNo;
    user.address = address;
    console.log(`req.file`, req.file);
    if (req.file) {
      user.image = result.secure_url;
    }

    const rows = await user.save();

    console.log("-----rows", rows);

    if (req.file) fs.unlinkSync(req.file.path);
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update user" });
    }

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await User.destroy({
      where: {
        id,
      },
    });
    console.log(rows);
    if (rows === 0) {
      return res.status(400).json({ message: "fail to delete user" });
    }

    res.status(204).json({ message: "Delete Successfully" });
  } catch (err) {
    next(err);
  }
};
