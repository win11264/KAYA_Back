const { Transaction, TransactionItem, Product } = require("../models");

exports.createTransaction = async (req, res, next) => {
  try {
    const { cartArray } = req.body;
    // const transItem = await Product.findOne({ where: { id: productId } });
    // if (amount === 0) {
    //   return res.status(400).json({ message: "value is not found" });
    // }

    const ArrayUser = cartArray.map(item => {
      return { ...item, userId: req.user.id };
    });

    const stockMap = ArrayUser.map(item => {
      return { productId: item.productId, amount: item.amount };
    });

    const updateStock = stockMap.map(async item => {
      const productStock = await Product.findOne({
        where: { id: item.productId },
      });
      console.log("--------------", productStock);

      productStock.amount = productStock.amount - item.amount;
      productStock.sale = productStock.sale + item.amount;

      await productStock.save();
    });
    await Promise.all(updateStock);

    // const trans = await Transaction.create({
    //   productId,
    //   userId: req.user.id,
    //   amount,
    //   price,
    //   value: price * amount,
    // });
    const trans = await Transaction.bulkCreate(ArrayUser);
    res.status(201).json({ message: "create Successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getAllTransaction = async (req, res, next) => {
  try {
    const trans = await Transaction.findAll({ where: { userId: req.user.id } });
    res.json({ trans });
  } catch (error) {
    next(error);
  }
};
