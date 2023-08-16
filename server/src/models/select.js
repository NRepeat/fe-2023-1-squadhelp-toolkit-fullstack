
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Select extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Select.init({
    type: { type: DataTypes.STRING, primaryKey: true },
    describe: { type: DataTypes.STRING, primaryKey: true },
  }, {
    sequelize,
    modelName: 'Select',
    timestamps: false,
  });
  return Select;
};
