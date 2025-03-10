const CONSTANTS = require('../constants');
const db = require('../models');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const NotFound = require('../errors/UserNotFoundError');
const moment = require('moment');
const { v4: uuid } = require('uuid');
const controller = require('../socketInit');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');
const AuthService = require('../services/auth.service');

module.exports.login = async (req, res, next) => {
	try {
		const { body: { email, password } } = req
		const foundUser = await userQueries.findUser({ email: email });
		const isSamePassword = await foundUser.comparePassword(password);
		if (!isSamePassword) {
			throw new NotFound('Wrong password');
		}

		const accessToken = await AuthService.createSession(foundUser);

		res.send({ token: accessToken });
	} catch (err) {
		next(err);
	}
};
module.exports.registration = async (req, res, next) => {
	try {
		const { body } = req
		const newUser = await userQueries.userCreation(body);

		const accessToken = await AuthService.createSession(newUser);

		res.send({ token: accessToken });
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			next(new NotUniqueEmail());
		} else {
			next(err);
		}
	}
};

function getQuery(offerId, userId, mark, isFirst, transaction) {
	const getCreateQuery = () => ratingQueries.createRating({
		offerId,
		mark,
		userId,
	}, transaction);
	const getUpdateQuery = () => ratingQueries.updateRating({ mark },
		{ offerId, userId }, transaction);
	return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
	let sum = 0;
	let avg = 0;
	let transaction;
	try {
		const { isFirst, offerId, mark, creatorId } = req.body;
		const userId = req.tokenData.userId;
		transaction = await db.sequelize.transaction(
			{ isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED });
		const query = getQuery(offerId, userId, mark, isFirst, transaction);
		await query();
		const offersArray = await db.Rating.findAll({
			include: [
				{
					model: db.Offer,
					required: true,
					where: { userId: creatorId },
				},
			],
			transaction,
		});
		for (let i = 0; i < offersArray.length; i++) {
			sum += offersArray[i].dataValues.mark;
		}
		avg = sum / offersArray.length;

		await userQueries.updateUser({ rating: avg }, creatorId, transaction);
		transaction.commit();
		controller.getNotificationController().emitChangeMark(creatorId);
		res.send({ userId: creatorId, rating: avg });
	} catch (err) {
		transaction.rollback();
		next(err);
	}
};

module.exports.payment = async (req, res, next) => {
	let transaction;
	try {
		const { body: { expiry, number, cvc, price, contests } } = req;
		transaction = await db.sequelize.transaction();
		await bankQueries.updateBankBalance({
			balance: db.sequelize.literal(`
                CASE
            WHEN "cardNumber"='${number.replace(/ /g,
				'')}' AND "cvc"='${cvc}' AND "expiry"='${expiry}'
                THEN "balance"-${price}
            WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}' AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}'
                THEN "balance"+${price} END
        `),
		},
			{
				cardNumber: {
					[db.Sequelize.Op.in]: [
						CONSTANTS.SQUADHELP_BANK_NUMBER,
						req.body.number.replace(/ /g, ''),
					],
				},
			},
			transaction);
		const orderId = uuid();
		contests.forEach((contest, index) => {
			const prize = index === contests.length - 1 ? Math.ceil(
				price / contests.length)
				: Math.floor(price / contests.length);
			contest = Object.assign(contest, {
				status: index === 0 ? 'active' : 'pending',
				userId: req.tokenData.userId,
				priority: index + 1,
				orderId,
				createdAt: moment().format('YYYY-MM-DD HH:mm'),
				prize,
			});
		});
		await db.Contest.bulkCreate(contests, transaction);
		transaction.commit();
		res.send();
	} catch (err) {
		transaction.rollback();
		next(err);
	}
};

module.exports.updateUser = async (req, res, next) => {
	try {
		const { file } = req
		if (file) {
			req.body.avatar = file.filename;
		}
		const updatedUser = await userQueries.updateUser(req.body,
			req.tokenData.userId);
		res.send({
			firstName: updatedUser.firstName,
			lastName: updatedUser.lastName,
			displayName: updatedUser.displayName,
			avatar: updatedUser.avatar,
			email: updatedUser.email,
			balance: updatedUser.balance,
			role: updatedUser.role,
			id: updatedUser.id,
		});
	} catch (err) {
		next(err);
	}
};

module.exports.cashout = async (req, res, next) => {
	let transaction;
	try {
		const {body:{sum,number,expiry,cvc}}=req
		transaction = await db.sequelize.transaction();
		const updatedUser = await userQueries.updateUser(
			{ balance: db.sequelize.literal('balance - ' + sum) },
			req.tokenData.userId, transaction);
		await bankQueries.updateBankBalance({
			balance: db.sequelize.literal(`CASE 
                WHEN "cardNumber"='${number.replace(/ /g,
				'')}' AND "expiry"='${expiry}' AND "cvc"='${cvc}'
                    THEN "balance"+${sum}
                WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}' AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}'
                    THEN "balance"-${sum}
                 END
                `),
		},
			{
				cardNumber: {
					[db.Sequelize.Op.in]: [
						CONSTANTS.SQUADHELP_BANK_NUMBER,
						number.replace(/ /g, ''),
					],
				},
			},
			transaction);
		transaction.commit();
		res.send({ balance: updatedUser.balance });
	} catch (err) {
		transaction.rollback();
		next(err);
	}
};


