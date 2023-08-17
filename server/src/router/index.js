const express = require('express');
const rootRouter = express.Router();
const transactionRouter = require('./transactionRouter');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const tokenRequestRouter = require('./tokenRequestRoutes');
const userValidationRouter = require('./userValidationRouter');
rootRouter.use('/',userValidationRouter)
rootRouter.use('/',checkToken.checkToken,tokenRequestRouter)
rootRouter.use('/transactions',transactionRouter)

router.post(
  '/registration',
  validators.validateRegistrationData,
  userController.registration,
);

module.exports = rootRouter;
