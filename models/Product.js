module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      sale: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      information: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      information: {
        type: DataTypes.STRING,
        allowNull: false,
        dafaultValue: "",
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
        dafaultValue: "",
      },
    },
    {
      underscored: true,
    }
  );

  Product.associate = (models) => {
    Product.hasMany(models.TransactionItem, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  Product.associate = (models) => {
    Product.belongsTo(models.Store, {
      foreignKey: {
        name: "storeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Product;
};
