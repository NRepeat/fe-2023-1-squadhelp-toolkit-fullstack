'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('catalogs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Make sure 'Users' matches your actual Users table name
          key: 'id',
        },
      },
      catalog_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('catalogs');
  },
};
