const db = require('../models');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');

module.exports.parseBody = (req, res, next) => {
	const {files,body:{contests}}=req
  contests = JSON.parse(contests);
  for (let i = 0; i < contests.length; i++) {
    if (contests[i].haveFile) {
      const file = files.splice(0, 1);
      contests[i].fileName = file[0].filename;
      contests[i].originalFileName = file[0].originalname;
    }
  }
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  const { params: { contestId } } = req;
  try {
    const { params: { contestId } } = req;
    if (req.tokenData.role === CONSTANTS.CUSTOMER) {
      result = await db.Contest.findOne({
        where: { id: contestId, userId: req.tokenData.userId },
      });
    } else if (req.tokenData.role === CONSTANTS.CREATOR) {
      result = await db.Contest.findOne({
        where: {
          id: contestId,
          status: {
            [db.Sequelize.Op.or]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    next(new RightsError());
  } else {
    next();
  }

};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CREATOR) {
    return next(new RightsError('this page only for customers'));
  } else {
    next();
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  try {
		const{body:{contestId}} =req
    const result = await db.Contest.findOne({
      where: {
        id: contestId,
      },
      attributes: ['status'],
    });
    if (result.get({ plain: true }).status ===
      CONSTANTS.CONTEST_STATUS_ACTIVE) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (e) {
    next(new ServerError());
  }

};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
		const{body:{contestId}} =req
    const result = await db.Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
		const{body:{contestId}} =req
    const result = db.Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: contestId,
        status: { [db.Sequelize.Op.not]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

