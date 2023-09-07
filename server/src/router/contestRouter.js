const contestRouter = require('express').Router();
const upload = require('../utils/fileUpload');
const contestController = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

contestRouter.get(
  '/customers',
  contestController.getCustomersContests,
);

contestRouter.post(
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
  // basicMiddlewares.canGetContest,
  contestController.getContestById,
);
contestRouter.post(
  '/dataForContest',
  contestController.dataForContest,
);
contestRouter.get(
  '/downloadFile/:fileName',
  contestController.downloadFile,
);



contestRouter.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

contestRouter.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);
module.exports = contestRouter;
