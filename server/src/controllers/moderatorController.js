const db = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');










module.exports.test = async (req, res, next) => {

	try {
		res.send({ data: 'dasdsd' })
	} catch (err) {
		next(new TokenError());
	}
};

module.exports.getOffers = async (req, res, next) => {
	try {
		const  contestInfo = await db.Contest.findAll({
			order: [
				[db.Offer, 'id', 'asc'],
			],
			include: [
				{
					model: db.Offer,
					required: false,
					attributes: { exclude: ['userId', 'contestId'] },
					include: [
						{
							model: db.User,
							required: true,
							attributes: {
								exclude: [
									'password',
									'role',
									'balance',
									'accessToken',
								],
							},
						},
						{
							model: db.Rating,
							required: false,
							where: { userId: req.tokenData.userId },
							attributes: { exclude: ['userId', 'offerId'] },
						},
					],
				},
			],
		});

		res.send(contestInfo);
	} catch (e) {
		next(new ServerError());
	}
};

module.exports.setOfferStatus = async (req, res, next) => {
  if(req.status = 'verified'){
		
	}
};
