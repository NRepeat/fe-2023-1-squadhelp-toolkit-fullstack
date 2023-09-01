'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('moderators', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			firstName: {
				field: "first_name",
				type: Sequelize.STRING,
				allowNull: false,
			},
			lastName: {
				field: "last_name",
				type: Sequelize.STRING,
				allowNull: false,
			},
			displayName: {
				field: "display_name",
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			role: {
				type: Sequelize.ENUM('moderator'),
				allowNull: false,
			},
			accessToken: {
				field: "access_token",
				type: Sequelize.TEXT,
				allowNull: true,
			},
			createdAt: {
				field: "created_at",
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				field: "updated_at",
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('moderators');
	}
};