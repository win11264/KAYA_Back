module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      underscored: true,
    }
  );

  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Address;
};
