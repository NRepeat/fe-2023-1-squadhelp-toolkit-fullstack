'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionHistory.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    }
  }
  TransactionHistory.init({
   
    operationType: {
      type: DataTypes.ENUM('INCOME', 'CONSUMPTION'),
      allowNull: false,
    },
    sum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },


  }, {
    sequelize,
    modelName: 'TransactionHistory',
    tableName: "transaction_histories",
    underscored: true,
  });
  return TransactionHistory;
};