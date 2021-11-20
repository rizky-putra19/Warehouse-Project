'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('admins', [
      {
        name: 'admin',
        email: 'admin@gmail.com',
        password: '$2b$10$xWZHmnvzXePzG.5rnaKaWOc.2Rx1GPzeJkfT76AHwl73yrVQe8hH2',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('admins', null, {});
  }
};
