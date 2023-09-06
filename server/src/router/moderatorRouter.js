const moderatorController = require('../controllers/moderatorController.js');





const moderatorRouter = require("express").Router();



moderatorRouter.get(
	'/moderator/:offerId',
	moderatorController.test
)

module.exports = moderatorRouter 