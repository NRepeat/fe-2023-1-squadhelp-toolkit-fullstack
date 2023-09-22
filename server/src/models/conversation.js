const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class Conversation extends Model {
		static associate({ CatalogChat ,Message}) {
			Conversation.hasMany(CatalogChat, { foreignKey: 'conversationId', sourceKey: 'id' })
			Conversation.hasMany(Message, { foreignKey: 'conversationId', sourceKey: 'id' })
	
		}
	}

	Conversation.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			participants: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
				allowNull: false,
			},
			blackList: {
				type: DataTypes.ARRAY(DataTypes.BOOLEAN),
				allowNull: false,
			},
			favoriteList: {
				type: DataTypes.ARRAY(DataTypes.BOOLEAN),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Conversation',
			timestamps: false,
		}
	);

	return Conversation;
};
