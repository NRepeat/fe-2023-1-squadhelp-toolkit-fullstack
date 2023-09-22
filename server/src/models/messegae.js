const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class Message extends Model {
		static associate({ User }) {
			Message.belongsTo(User,
				{ foreignKey: 'userId', sourceKey: 'id' });
		}
	}

	Message.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'User',
					key: 'id',
				},
			},
			body: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			conversationId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Message',
			timestamps: true,
		}
	);

	return Message;
};
