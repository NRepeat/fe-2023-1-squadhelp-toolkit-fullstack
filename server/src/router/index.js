const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/checkToken');
const contestRouter = require('./contestRouter');
const userRouter = require('./userRouter');
const chatRouter = require('./chatRouter');
const moderatorRouter = require('./moderatorRouter');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

router.use("/",userRouter)
router.use('/contests', checkToken.checkToken, contestRouter);
router.use('/chat', checkToken.checkToken, chatRouter);
router.use('/moder' ,moderatorRouter)

module.exports = router;
