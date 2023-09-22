'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('catalog_chats', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      catalog_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'catalogs',
          key: 'id',
        },
      },
      conversation_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'conversations',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('catalog_chats');
  },
};
