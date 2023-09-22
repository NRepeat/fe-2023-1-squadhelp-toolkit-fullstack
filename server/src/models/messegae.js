const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class Message extends Model {
		static associate({ User, Conversation }) {
			Message.belongsTo(User,
				{ foreignKey: 'userId', sourceKey: 'id' });
			Message.belongsTo(Conversation,
				{ foreignKey: 'conversationId', sourceKey: 'id' });
		}
	}

	Message.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			userId: {
				type: DataTypes.INTEGER,
		
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
