module.exports = (sequelize, DataTypes) => {
  const Exchange = sequelize.define(
    "Exchange",
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

  Exchange.associate = (models) => {
    Exchange.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  Exchange.associate = (models) => {
    Exchange.hasMany(models.ExchangeItem, {
      foreignKey: {
        name: "exchangeItemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Exchange;
};
