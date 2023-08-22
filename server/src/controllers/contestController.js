const db = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');


module.exports.dataForContest = async (req, res, next) => {
	try {
		const { body: { characteristic1, characteristic2 } } = req;
		const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);

		const characteristics = await db.Select.findAll({
			where: {
				type: {
					[db.Sequelize.Op.or]: types,
				},
			},
		});
		if (!characteristics) {
			return next(new ServerError('No characteristics found'));
		}
		const response = {};
		characteristics.forEach(characteristic => {
			if (!response[characteristic.type]) {
				response[characteristic.type] = [];
			}
			response[characteristic.type].push(characteristic.describe);
		});
		res.send(response);
	} catch (err) {
		next(new ServerError('Cannot get contest preferences'));
	}
};

module.exports.getContestById = async (req, res, next) => {
	try {
		const { params: { contestId } } = req;
		const contestInfo = await db.Contest.findOne({
			where: { id: contestId },
			order: [
				[db.Offer, 'id', 'asc'],
			],
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
					model: db.Offer,
					required: false,
					where: req.tokenData.role === CONSTANTS.CREATOR
						? { userId: req.tokenData.userId }
						: {},
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
		const contestInfoPlain = contestInfo.get({ plain: true });
		contestInfoPlain.Offers.forEach(offer => {
			if (offer.Rating) {
				offer.mark = offer.Rating.mark;
			}
			delete offer.Rating;
		});
		res.send(contestInfoPlain);
	} catch (e) {
		console.log('==========================ERROR==========================');
		console.log(e);
		next(new ServerError());
	}
};

module.exports.downloadFile = async (req, res, next) => {
	const { params: { fileName } } = req
	try {
		const file = CONSTANTS.CONTESTS_DEFAULT_DIR + fileName;
		res.download(file);
	} catch (err) {
		next(err);
	}
};

module.exports.updateContest = async (req, res, next) => {
  try {
    const { file, params, body, tokenData } = req;
    const { contestId } = params;
    let { fileName, originalFileName } = body;
    if (file) {
      fileName = file.filename;
      originalFileName = file.originalname;
    }
    const updatedContest = await contestQueries.updateContest(body, {
      id: contestId,
      userId: tokenData.userId,
    });
    res.send(updatedContest);
  } catch (error) {
    next(error);
  }
};


module.exports.setNewOffer = async (req, res, next) => {
	try {
		const { body, file, tokenData } = req;
		const { contestType, offerData, contestId, customerId } = body;
		const obj = {};
		if (contestType === CONSTANTS.LOGO_CONTEST) {
			obj.fileName = file.filename;
			obj.originalFileName = file.originalname;
		} else {
			obj.text = offerData;
		}
		obj.userId = tokenData.userId;
		obj.contestId = contestId;
		const result = await contestQueries.createOffer(obj);
		delete result.contestId;
		delete result.userId;
		controller.getNotificationController().emitEntryCreated(customerId);
		const User = { ...tokenData, id: tokenData.userId };
		res.send({ ...result, User });
	} catch (error) {
		next(new ServerError('Failed to create offer'));
	}
};


const rejectOffer = async (offerId, creatorId, contestId) => {
	try {
		const rejectedOffer = await contestQueries.updateOffer(
			{ status: CONSTANTS.OFFER_STATUS_REJECTED },
			{ id: offerId }
		);

		controller.getNotificationController().emitChangeOfferStatus(
			creatorId,
			'One of your offers was rejected',
			contestId
		);

		return rejectedOffer;
	} catch (error) {
		throw new Error('Failed to reject offer');
	}
};


const resolveOffer = async (
	contestId, creatorId, orderId, offerId, priority, transaction) => {
	try {
		const contestStatusQuery = `
      CASE
        WHEN "id"=${contestId} AND "orderId"='${orderId}' THEN '${CONSTANTS.CONTEST_STATUS_FINISHED}'
        WHEN "orderId"='${orderId}' AND "priority"=${priority + 1} THEN '${CONSTANTS.CONTEST_STATUS_ACTIVE}'
        ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
      END
    `;

		const finishedContest = await contestQueries.updateContestStatus(
			{ status: db.sequelize.literal(contestStatusQuery) },
			{ orderId },
			transaction
		);

		await userQueries.updateUser(
			{ balance: db.sequelize.literal(`balance + ${finishedContest.prize}`) },
			creatorId,
			transaction
		);

		const offerStatusQuery = `
      CASE
        WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
        ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
      END
    `;

		const updatedOffers = await contestQueries.updateOfferStatus(
			{ status: db.sequelize.literal(offerStatusQuery) },
			{ contestId },
			transaction
		);

		transaction.commit();

		const arrayRoomsId = updatedOffers
			.filter(offer => offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !== offer.userId)
			.map(offer => offer.userId);

		controller.getNotificationController().emitChangeOfferStatus(
			arrayRoomsId,
			'Someone of your offers was rejected',
			contestId
		);

		controller.getNotificationController().emitChangeOfferStatus(
			creatorId,
			'Someone of your offers WIN',
			contestId
		);

		return updatedOffers[0].dataValues;
	} catch (error) {
		transaction.rollback();
		throw error;
	}
};


module.exports.setOfferStatus = async (req, res, next) => {
	let transaction;
	try {
		const { command, offerId, creatorId, contestId, orderId, priority } = req.body;
		if (command === 'reject') {
			const rejectedOffer = await rejectOffer(offerId, creatorId, contestId);
			res.send(rejectedOffer);
		} else if (command === 'resolve') {
			transaction = await db.sequelize.transaction();
			const resolvedOffer = await resolveOffer(
				contestId, creatorId, orderId, offerId, priority, transaction
			);
			res.send(resolvedOffer);
			transaction.commit();
		}
	} catch (error) {
		if (transaction) {
			transaction.rollback();
		}
		next(error);
	}
};


module.exports.getCustomersContests = async (req, res, next) => {
	try {
		const { query: { status, limit, offset } } = req;

		const contests = await db.Contest.findAll({
			where: { status, userId: req.tokenData.userId },
			limit,
			offset: offset ? offset : 0,
			order: [['id', 'DESC']],
			include: [
				{
					model: db.Offer,
					attributes: ['id'],
				},
			],
		});

		contests.forEach(
			contest => (contest.dataValues.count = contest.Offers.length)
		);

		const haveMore = contests.length > 0;
		res.send({ contests, haveMore });
	} catch (err) {
		next(new ServerError(err));
	}
};


module.exports.getContests = async (req, res, next) => {
	try {
		const { body: { typeIndex, contestId, industry, awardSort, limit, offset, ownEntries } } = req;
		const predicates = UtilFunctions.createWhereForAllContests(typeIndex,
			contestId, industry, awardSort);

		const contests = await db.Contest.findAll({
			where: predicates.where,
			order: predicates.order,
			limit: limit,
			offset: offset ? offset : 0,
			include: [
				{
					model: db.Offer,
					required: ownEntries,
					where: ownEntries ? { userId: req.tokenData.userId } : {},
					attributes: ['id'],
				},
			],
		});

		contests.forEach(
			contest => (contest.dataValues.count = contest.Offers.length)
		);

		const haveMore = contests.length > 0;
		res.send({ contests, haveMore });
	} catch (err) {
		next(new ServerError(err));
	}
};