module.exports = (sequelize, DataTypes) => {
  const Exchange = sequelize.define(
    "Exchange",
    {
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: " ",
      },
      value: {
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
    }),
      Exchange.belongsTo(models.Waste, {
        foreignKey: {
          name: "wasteId",
          allowNull: false,
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
  };

  return Exchange;
};
