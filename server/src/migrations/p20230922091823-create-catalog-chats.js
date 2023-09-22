'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CatalogChats', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      catalogId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Catalogs',
          key: 'id',
        },
      },
      conversationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Conversations',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CatalogChats');
  },
};
