module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    "Store",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hashtag: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      contact: {
        type: DataTypes.STRING,
        allowNull: false,
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

  Store.associate = (models) => {
    Store.hasMany(models.Product, {
      foreignKey: {
        name: "storeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Store;
};
