const schems = require('../validationSchemes/schems');
const BadRequestError = require('../errors/BadRequestError');

module.exports.validateRegistrationData = async (req, res, next) => {
	try {
		const{body} =req
		const validationResult = await schems.registrationSchem.isValid(body);
		if (!validationResult) {
			throw new BadRequestError('Invalid data for registration');
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports.validateLogin = async (req, res, next) => {
	try {
		const{body} =req
		const validationResult = await schems.loginSchem.isValid(body);
		if (!validationResult) {
			throw new BadRequestError('Invalid data for login');
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports.validateContestCreation = async (req, res, next) => {
	try {
		const{body:{contests}} =req
		const promiseArray = contests.map(el => schems.contestSchem.isValid(el));
		const results = await Promise.all(promiseArray);

		results.forEach(result => {
			if (!result) {
				throw new BadRequestError();
			}
		});

		next();
	} catch (error) {
		next(error);
	}
};

