// const { ExchangeItem, Waste } = require("../models");
// const utils = require("util");
// const fs = require("fs");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const express = require("express");

// const app = express();

// const uploadPromise = utils.promisify(cloudinary.uploader.upload);

// exports.getAllExcItem = async (req, res, next) => {
//   try {
//     const ExcItem = await ExchangeItem.findAll();
//     res.json({ ExcItem });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getExcItemeById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const ExcItem = await ExchangeItem.findOne({ where: { id } });
//     res.json({ ExcItem });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.createExcItem = async (req, res, next) => {
//   try {
//     const { amount, exchangeId, wasteId, image } = req.body;
//     const result = await uploadPromise(req.file.path);
//     const excItem = await Waste.findOne({ where: { id: wasteId } });
//     // const totalIncome = (waste, amount) => {
//     //   return waste.rate * amount;
//     // };

//     // console.log("This is Waste Id", waste);

//     const ExcItem = await ExchangeItem.create({
//       amount,
//       image: result.secure_url,
//       exchangeId,
//       wasteId,
//       total,
//     });

//     fs.unlinkSync(req.file.path);

//     res.status(201).json({ ExcItem });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.updateExcItem = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { amount, exchangeId, wasteId } = req.body;

//     const [rows] = await ExchangeItem.update(
//       { amount, exchangeId, waseId },
//       { where: { id } }
//     );
//     if (rows === 0) {
//       return res.status(400).json({ message: "fail to update store" });
//     }

//     res.status(200).json({ message: "Successfully update store" });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.deleteExcItem = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const rows = await ExchangeItem.destroy({
//       where: {
//         id,
//       },
//     });
//     console.log(rows);
//     if (rows === 0) {
//       return res.status(400).json({ message: "fail to delete waste" });
//     }

//     res.status(204).json({ message: "Delete Successfully" });
//   } catch (err) {
//     next(err);
//   }
// };
