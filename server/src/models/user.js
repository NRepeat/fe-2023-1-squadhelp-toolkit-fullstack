
const {
  Model,
} = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');


async function hashPassword(user, options) {
  if (user.changed('password')) {
    const { password } = user;
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
    user.password = hashedPass;
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Offer, Contest, Rating }) {
      User.hasMany(Offer,
        { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Contest,
        { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Rating,
        { foreignKey: 'userId', targetKey: 'id' });
    }

    async comparePassword(password) {
      return bcrypt.compare(password, this.getDataValue('password'));
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'anon.png',
    },
    role: {
      type: DataTypes.ENUM('customer', 'creator'),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
