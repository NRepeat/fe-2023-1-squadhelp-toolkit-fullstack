'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Conversations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      participants: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      blackList: {
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        allowNull: false,
      },
      favoriteList: {
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Conversations');
  },
};
