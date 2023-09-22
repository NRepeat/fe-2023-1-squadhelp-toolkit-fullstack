const db = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');











module.exports.getOffers = async (req, res, next) => {
	try {
		const contestInfo = await db.Contest.findAll({
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
		next(e);
	}
};

module.exports.updateOfferStatus = async (req, res, next) => {
	try {
		if (req.body.status === 'verified') { 
			const [updatedCount, [updatedOffer]] = await db.Offer.update(
				{ status: req.body.status }, 
				{ where: { id: req.body.id }, returning: true }
			);

			if (updatedCount !== 1) {
				throw new ServerError('Cannot update offer');
			}

			return res.json(updatedOffer);
		} else if (req.body.status === 'rejected') {
			const [updatedCount, [updatedOffer]] = await db.Offer.update(
				{ status: req.body.status }, 
				{ where: { id: req.body.id }, returning: true }
			);

			if (updatedCount !== 1) {
				throw new ServerError('Cannot update offer');
			}
			return res.json(updatedOffer);
		}
		else {
			return res.status(400).json({ error: 'Invalid status' });
		}
	} catch (error) {
		console.error('Error updating offer:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
