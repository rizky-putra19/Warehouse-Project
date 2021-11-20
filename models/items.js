'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      items.hasMany(models.dataStockIns, {as: 'datastockins', foreignKey: 'itemId'});
      items.hasMany(models.dataStockOuts, {as: 'datastockouts', foreignKey: 'itemId'});
      items.belongsTo(models.categories, {as: 'items', foreignKey: 'categoryId'});
    }
  };
  items.init({
    name: DataTypes.STRING,
    photoProduct: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};