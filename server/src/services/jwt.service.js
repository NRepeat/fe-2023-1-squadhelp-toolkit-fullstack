const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {
  ACCESS_TOKEN_TIME,
  JWT_SECRET: ACCESS_TOKEN_SECRET,
} = require('../constants');

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: ACCESS_TOKEN_SECRET,
    expiresIn: ACCESS_TOKEN_TIME,
  },
};

const createToken = async (payload, { secret, expiresIn }) => await sign(payload, secret, {
  expiresIn,
});

const verifyToken = async (token, { secret }) => await verify(token, secret);

module.exports.createAccessToken = async (payload) =>
  createToken(payload, tokenConfig.access);

module.exports.verifyAccessToken = async (token) =>
  await verifyToken(token, tokenConfig.access);
