const moderatorController = require('../controllers/moderatorController.js');
const { canGetOffer } = require('../middlewares/basicMiddlewares.js');





const moderatorRouter = require("express").Router();



moderatorRouter.get(
	'/moderator/:offerId',
	canGetOffer,
	moderatorController.test
)

module.exports = moderatorRouter 