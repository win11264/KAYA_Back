// module.exports = (sequelize, DataTypes) => {
//   const ExchangeItem = sequelize.define(
//     "ExchangeItem",
//     {
//       amount: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },

//       image: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: " ",
//       },
//     },
//     {
//       underscored: true,
//     }
//   );

//   ExchangeItem.associate = (models) => {
//     ExchangeItem.belongsTo(models.Exchange, {
//       foreignKey: {
//         name: "exchangeId",
//         allowNull: false,
//       },
//       onDelete: "RESTRICT",
//       onUpdate: "RESTRICT",
//     });
//   };

//   ExchangeItem.associate = (models) => {
//     ExchangeItem.belongsTo(models.Waste, {
//       foreignKey: {
//         name: "wasteId",
//         allowNull: false,
//       },
//       onDelete: "RESTRICT",
//       onUpdate: "RESTRICT",
//     });
//   };

//   return ExchangeItem;
// };
