'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Messages', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			body: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			conversationId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Conversations', 
					key: 'id',
				},
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Messages');
	},
};
