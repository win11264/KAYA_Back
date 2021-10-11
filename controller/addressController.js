const { Address } = require("../models");

exports.getAllAddress = async (req, res, next) => {
  try {
    const address = await Address.findAll();
    res.json({ address });
  } catch (error) {
    next(error);
  }
};

exports.getAddressById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await Address.findOne({ where: { id } });
    res.json({ address });
  } catch (error) {
    next(error);
  }
};

exports.createAdress = async (req, res, next) => {
  try {
    const { title, detail, userId } = req.body;

    const address = await Address.create({
      title,
      detail,
      userId,
    });
    res.status(201).json({ address });
  } catch (error) {
    next(error);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, detail, userId } = req.body;

    const [rows] = await Address.update(
      { title, detail, userId },
      { where: { id } }
    );
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update store" });
    }

    res.status(200).json({ message: "Successfully update store" });
  } catch (error) {
    next(error);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rows = await Address.destroy({
      where: {
        id,
      },
    });

    if (rows === 0) {
      return res.status(400).json({ message: "fail to delete waste" });
    }

    res.status(204).json({ message: "Delete Successfully" });
  } catch (err) {
    next(err);
  }
};
