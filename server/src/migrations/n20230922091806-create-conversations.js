'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      participants: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      black_list: {
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        allowNull: false,
      },
      favorite_list: {
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversations');
  },
};
