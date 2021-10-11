const { Store } = require("../models");

exports.getAllStore = async (req, res, next) => {
  try {
    const store = await Store.findAll();
    res.json({ store });
  } catch (error) {
    next(error);
  }
};

exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await Store.findOne({ where: { id } });
    res.json({ store });
  } catch (error) {
    next(error);
  }
};

exports.createStore = async (req, res, next) => {
  try {
    const { name, address, contact, hashtag, image } = req.body;
    if (
      req.user.username === "admin01" ||
      req.user.username === "admin02" ||
      req.user.username === "admin03"
    ) {
      const store = await Store.create({
        name,
        address,
        contact,
        hashtag,
        image,
      });
      res.status(201).json({ store });
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
      const [rows] = await Store.update(
        { name, address, contact, hashtag, image },
        { where: { id } }
      );
      if (rows === 0) {
        return res.status(400).json({ message: "fail to update store" });
      }

      res.status(200).json({ message: "Successfully update store" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
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
