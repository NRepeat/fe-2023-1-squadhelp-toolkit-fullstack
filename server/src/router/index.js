const express = require('express');
const rootRouter = express.Router();
const transactionRouter = require('./transactionRouter');
const checkToken = require('../middlewares/checkToken');
const tokenRequestRouter = require('./tokenRequestRoutes');
const userValidationRouter = require('./userValidationRouter');
rootRouter.use('/',userValidationRouter)
rootRouter.use('/',checkToken.checkToken,tokenRequestRouter)
rootRouter.use('/transactions',transactionRouter)


module.exports = rootRouter;
