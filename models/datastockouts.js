'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dataStockOuts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      dataStockOuts.belongsTo(models.items, {foreignKey: 'itemId'})
    }
  };
  dataStockOuts.init({
    itemId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dataStockOuts',
  });
  return dataStockOuts;
};