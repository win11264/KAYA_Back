const { Waste } = require("../models");

exports.getAllWastes = async (req, res, next) => {
  try {
    const wastes = await Waste.findAll();
    res.json({ wastes });
  } catch (error) {
    next(error);
  }
};

exports.getWasteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await Waste.findOne({ where: { id } });
    res.json({ list });
  } catch (err) {
    next(err);
  }
};

exports.createWaste = async (req, res, next) => {
  try {
    const { name, rate } = req.body;
    console.log(req.user.username !== "admin01");

    console.log(req.user.username !== "admin02");

    console.log(req.user.username !== "admin03");
    if (
      req.user.username === "admin01" ||
      req.user.username === "admin02" ||
      req.user.username === "admin03"
    ) {
      const waste = await Waste.create({
        name,
        rate,
      });
      res.status(201).json({ waste });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (err) {
    next(err);
  }
};

exports.updateList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, rate } = req.body;
    if (
      req.user.username !== "admin01" ||
      req.user.username !== "admin02" ||
      req.user.username !== "admin03"
    ) {
      return res.status(401).json({ message: "you are unauthorized" });
    }
    const [rows] = await Waste.update(
      { name, rate },
      {
        where: {
          id,
        },
      }
    );

    if (rows === 0) {
      return res.status(400).json({ message: "fail to update waste" });
    }

    res.status(200).json({ message: "success update waste" });
  } catch (err) {
    next(err);
  }
};

exports.deleteWaste = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (
      req.user.username !== "admin01" ||
      req.user.username !== "admin02" ||
      req.user.username !== "admin03"
    ) {
      return res.status(401).json({ message: "you are unauthorized" });
    }
    const rows = await Waste.destroy({
      where: {
        id,
      },
    });

    if (rows === 0) {
      return res.status(400).json({ message: "fail to delete waste" });
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
