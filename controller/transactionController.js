const { Transaction, TransactionItem, Product } = require("../models");

exports.createTransaction = async (req, res, next) => {
  try {
    const { productId, amount, price } = req.body;
    const transItem = await Product.findOne({ where: { id: productId } });
    if (amount === 0) {
      return res.status(400).json({ message: "value is not found" });
    }
    const trans = await Transaction.create({
      productId,
      userId: req.user.id,
      amount,
      price,
      value: price * amount,
    });
    res.status(201).json({ message: "create Successfully" });
  } catch (error) {
    next(error);
  }
};
