module.exports = (sequelize, DataTypes) => {
  const TransactionItem = sequelize.define(
    "TransactionItem",
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      underscored: true,
    }
  );

  TransactionItem.associate = (models) => {
    TransactionItem.belongsTo(models.Transaction, {
      foreignKey: {
        name: "transactionId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  TransactionItem.associate = (models) => {
    TransactionItem.belongsTo(models.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return TransactionItem;
};
