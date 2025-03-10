
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Contest, Rating }) {
      Offer.belongsTo(User,
        { foreignKey: 'userId', sourceKey: 'id' });
      Offer.belongsTo(Contest,
        { foreignKey: 'contestId', sourceKey: 'id' });
      Offer.hasOne(Rating,
        { foreignKey: 'offerId', targetKey: 'id' });
    }
  }
  Offer.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    originalFileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
		status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
		moderatorFeedback:{
			type: DataTypes.STRING,
      allowNull: true,
		}
  }, {
    sequelize,
    modelName: 'Offer',
    timestamps: false,
  });
  return Offer;
};
