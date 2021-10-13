const { User } = require("../models");
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

    res.json({ userDetail });
  } catch (error) {
    next(error);
  }
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
    const { firstName, lastName, birthDate, email, mobileNo, image, address } =
      req.body;

    const result = await uploadPromise(req.file.path);
    const [rows] = await User.update(
      {
        firstName,
        lastName,
        birthDate,
        email,
        mobileNo,
        address,
        image: result.secure_url,
      },
      { where: { id: req.user.id } }
    );
    fs.unlinkSync(req.file.path);
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update user" });
    }

    res.status(200).json(result.secure_url);
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
