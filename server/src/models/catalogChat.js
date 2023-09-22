const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class CatalogChat extends Model {
		static associate({ Catalog, Conversation }) {
			CatalogChat.belongsTo(Catalog,
				{ foreignKey: 'catalogId', sourceKey: 'id' });
			CatalogChat.belongsTo(Conversation,
				{ foreignKey: 'conversationId', sourceKey: 'id' });
		}
	}

	CatalogChat.init(
		{
			// Define fields that match your table columns here
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			catalog_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Catalog', // Make sure 'Catalog' matches your actual Catalog model name
					key: 'id',
				},
			},
			conversation_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Conversation', // Make sure 'Conversation' matches your actual Conversation model name
					key: 'id',
				},
			},
		},
		{
			sequelize,
			modelName: 'CatalogChat',
			timestamps: false,
		}
	);

	return CatalogChat;
};
