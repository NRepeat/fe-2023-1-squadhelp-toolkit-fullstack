const contestRouter = require('express').Router();
const upload = require('../utils/fileUpload');
const contestController = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

contestRouter.get(
  '/customers',
  contestController.getCustomersContests,
);

contestRouter.get(
  '/all',
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

contestRouter.put(
  '/:contestId',
  upload.updateContestFile,
  contestController.updateContest,
);

contestRouter.get(
  '/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

module.exports = contestRouter;
