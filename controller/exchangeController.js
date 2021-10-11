const { Exchange, ExchangeItem, Waste } = require("../models");

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
    const {} = req.body;
    console.log("request body", id);

    const exc = await Exchange.create({
      total,
      userId,
    });
    const ExcItem = await ExchangeItem.create({
      amount,
      exchangeId,
      wasteId,
    });

    res.status(201).json({ exc });
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
