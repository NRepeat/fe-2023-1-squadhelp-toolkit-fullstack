const db = require('../../models');
const ServerError = require('../../errors/ServerError');

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await db.Contest.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const updateResult = await db.Contest.update(data,
    { where: predicate, returning: true, transaction });
  if (updateResult[ 0 ] < 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updateResult[ 1 ][ 0 ].dataValues;
  }
};

module.exports.updateOffer = async (data, predicate, transaction) => {
  console.log("🚀 ~ file: contestQueries.js:25 ~ module.exports.updateOffer= ~ transaction:", transaction)
  console.log("🚀 ~ file: contestQueries.js:25 ~ module.exports.updateOffer= ~ predicate:", predicate)
	data = {status:'rejected by moderator'}

  console.log("🚀 ~ file: contestQueries.js:25 ~ module.exports.updateOffer= ~ data:", data)
	
  const [updatedCount, [updatedOffer]] = await db.Offer.update(data,
    { where: predicate, returning: true, transaction });
  console.log("🚀 ~ file: contestQueries.js:28 ~ module.exports.updateOffer= ~ updatedOffer:", updatedOffer)
  if (updatedCount !== 1) {
    throw new ServerError('cannot update offer!');
  } else {
    console.log("🚀 ~ file: contestQueries.js:35 ~ module.exports.updateOffer= ~ updatedOffer.dataValues:", updatedOffer.dataValues)

    return updatedOffer.dataValues;
  }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
  const result = await db.Offer.update(data,
    { where: predicate, returning: true, transaction });
  if (result[ 0 ] < 1) {
    throw new ServerError('cannot update offer!');
  } else {
    return result[ 1 ];
  }
};

module.exports.createOffer = async (data) => {
  const result = await db.Offer.create(data);
  if (!result) {
    throw new ServerError('cannot create new Offer');
  } else {
    return result.get({ plain: true });
  }
};
