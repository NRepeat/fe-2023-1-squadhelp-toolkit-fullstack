const ErrorLogger = require("./ErrorLoger");

const logger = new ErrorLogger('error_log.json');

module.exports = async (err, req, res, next) => {
	if (err) {
		logger.logError(err.message, err.code, err.stack);
		next(err);
	}
	next()
}