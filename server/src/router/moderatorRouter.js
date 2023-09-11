const moderatorController = require('../controllers/moderatorController.js');




const moderatorRouter = require("express").Router();



moderatorRouter.get(
	'/allOffers',
	moderatorController.getOffers,
)
moderatorRouter.put(
	'/updateOfferStatus',
	moderatorController.updateOfferStatus
)
module.exports = moderatorRouter 