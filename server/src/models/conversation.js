const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class Conversation extends Model {
		static associate({ CatalogChat }) {
			Conversation.hasMany(CatalogChat, { foreignKey: 'conversationId', sourceKey: 'id' })
		}
	}

	Conversation.init(
		{
			// Define fields that match your table columns here
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			participants: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
				allowNull: false,
			},
			black_list: {
				type: DataTypes.ARRAY(DataTypes.BOOLEAN),
				allowNull: false,
			},
			favorite_list: {
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
