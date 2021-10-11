const { Product } = require("../models");

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

    if (
      req.user.username === "admin01" ||
      req.user.username === "admin02" ||
      req.user.username === "admin03"
    ) {
      const product = await Product.create({
        name,
        price,
        amount,
        information,
        image,
        storeId,
      });
      res.status(201).json({ product });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (err) {
    next(err.message);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, amount, information, image, storeId } = req.body;
    if (
      req.user.username === "admin01" ||
      req.user.username === "admin02" ||
      req.user.username === "admin03"
    ) {
      const [rows] = await Product.update(
        { name, price, amount, information, image, storeId },
        {
          where: {
            id,
          },
        }
      );
      if (rows === 0) {
        return res.status(400).json({ message: "fail to update product" });
      }

      res.status(200).json({ message: "success update product" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
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
