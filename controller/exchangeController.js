const { Exchange, ExchangeItem, Waste } = require("../models");
const utils = require("util");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

// Exchange.post(
//   "/upload-to-cloud",
//   upload.single("cloudinput"),
//   async (req, res, next) => {
//     console.log(req.file);
//     const { username, password, email, confirmPassword } = req.body;

//     try {
//       const result = await uploadPromise(req.file.path);
//       const user = await User.create({
//         username,
//         password: result.secure_url,
//         email,
//       });
//       fs.unlinkSync(req.file.path);
//       res.json({ user });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

exports.getAllExchange = async (req, res, next) => {
  try {
    const exc = await Exchange.findAll({
      include: { model: ExchangeItem, require: true },
    });
    res.json({ exc });
  } catch (error) {
    next(error);
  }
};

exports.getExchangeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exc = await Exchange.findOne({ where: { id } });

    res.json({ exc });
  } catch (error) {
    next(error);
  }
};

exports.createExchange = async (req, res, next) => {
  try {
    const { wasteId, amount, rate } = req.body;
    console.log(req.body);
    console.log(req.file);
    const result = await uploadPromise(req.file.path);
    const excItem = await Waste.findOne({ where: { id: wasteId } });
    if (amount === 0) {
      return res.status(400).json({ message: "value is not found" });
    }

    const exc = await Exchange.create({
      wasteId,
      userId: req.user.id,
      amount,
      rate,
      image: result.secure_url,
      value: rate * amount,
    });
    console.log(req.file);
    fs.unlinkSync(req.file.path);
    res.status(201).json({ message: "create Successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateExchange = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { total, userId } = req.body;

    const [rows] = await Exchange.update({ total, userId }, { where: { id } });
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update store" });
    }

    res.status(200).json({ message: "Successfully update store" });
  } catch (error) {
    next(error);
  }
};

exports.deleteExchange = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rows = await Exchange.destroy({
      where: {
        id,
      },
    });
    console.log(rows);
    if (rows === 0) {
      return res.status(400).json({ message: "fail to delete waste" });
    }

    res.status(204).json({ message: "Delete Successfully" });
  } catch (err) {
    next(err);
  }
};
