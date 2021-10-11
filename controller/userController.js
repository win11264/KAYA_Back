const { User } = require("../models");

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.json({ user });
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
    const { id } = req.params;
    const {
      firstName,
      lastName,
      birthDate,
      email,
      mobileNo,
      username,
      password,
    } = req.body;

    const [rows] = await User.update(
      { firstName, lastName, birthDate, email, mobileNo, username },
      { where: { id } }
    );
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update user" });
    }

    res.status(200).json({ message: "Successfully update user" });
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
