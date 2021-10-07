module.exports = (sequelize, DataTypes) => {
  const Waste = sequelize.define(
    "Waste",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Waste.associate = (models) => {
    Waste.hasMany(models.ExchangeItem, {
      foreignKey: {
        name: "wasteId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Waste;
};
