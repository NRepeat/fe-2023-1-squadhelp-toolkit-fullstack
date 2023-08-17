const JwtService = require('./jwt.service');
const userQueries = require('../controllers/queries/userQueries');

module.exports.createSession = async (user) => {

  const accessToken = await JwtService.createAccessToken({
    firstName: user.firstName,
    userId: user.id,
    role: user.role,
    lastName: user.lastName,
    avatar: user.avatar,
    displayName: user.displayName,
    balance: user.balance,
    email: user.email,
    rating: user.rating,
  });

  await userQueries.updateUser({ accessToken }, user.id);

  return accessToken;
};
