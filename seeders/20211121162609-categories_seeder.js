'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('categories', [
      {
        name: 'Staple Food',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Drink',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dry and Wet Bread',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Snack',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Body Care',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name: 'Washing Material and Equipment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Home Care Materials and Equipment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Stationery and Office',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('categories', null, {});
  }
};
