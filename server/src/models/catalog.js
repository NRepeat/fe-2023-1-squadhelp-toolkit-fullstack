const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class Catalog extends Model {
		static associate({ User, CatalogChat }) {
			Catalog.belongsTo(User,
				{ foreignKey: 'userId', sourceKey: 'id' });
			Catalog.hasMany(CatalogChat, { foreignKey: 'userId', sourceKey: 'id' })
		}
	}

	Catalog.init(
		{
			
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'User',
					key: 'id',
				},
			},
			catalogName: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Catalog',
			timestamps: false,
		}
	);

	return Catalog;
};
