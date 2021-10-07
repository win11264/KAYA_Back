module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      underscored: true,
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  Transaction.associate = (models) => {
    Transaction.hasMany(models.TransactionItem, {
      foreignKey: {
        name: "transactionId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Transaction;
};
