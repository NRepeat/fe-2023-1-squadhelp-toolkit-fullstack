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
			
			
			catalogId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Catalog', 
					key: 'id',
				},
			},
			conversationId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Conversation', 
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
