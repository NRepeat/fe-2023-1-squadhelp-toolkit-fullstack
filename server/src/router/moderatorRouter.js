const moderatorController = require('../controllers/moderatorController.js');





const moderatorRouter = require("express").Router();



moderatorRouter.get(
	'/moderator',
	moderatorController.test
)

module.exports =  moderatorRouter 