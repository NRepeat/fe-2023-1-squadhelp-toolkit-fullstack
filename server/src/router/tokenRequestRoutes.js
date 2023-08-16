const contestController = require('../controllers/contestController');
const tokenRequestRouter = require("express").Router();
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const chatController = require('../controllers/chatController');
const userController = require('../controllers/userController');
const validators = require('../middlewares/validators');
tokenRequestRouter.get(
    '/getCustomersContests',
    contestController.getCustomersContests,
);
tokenRequestRouter.post(
    '/getAllContests',
    basicMiddlewares.onlyForCreative,
    contestController.getContests,
);
tokenRequestRouter.get(
    '/getContestById/:contestId',
    basicMiddlewares.canGetContest,
    contestController.getContestById,
);
tokenRequestRouter.get(
    '/downloadFile/:fileName',
    contestController.downloadFile,
);
tokenRequestRouter.post(
    '/setNewOffer',
    upload.uploadLogoFiles,
    basicMiddlewares.canSendOffer,
    contestController.setNewOffer,
);
tokenRequestRouter.post(
    '/dataForContest',

    contestController.dataForContest,
);
tokenRequestRouter.post(
    '/setOfferStatus',

    basicMiddlewares.onlyForCustomerWhoCreateContest,
    contestController.setOfferStatus,
);
tokenRequestRouter.post(
    '/changeMark',

    basicMiddlewares.onlyForCustomer,
    userController.changeMark,
);
tokenRequestRouter.post(
    '/updateUser',

    upload.uploadAvatar,
    userController.updateUser,
);

tokenRequestRouter.post(
    '/cashout',

    basicMiddlewares.onlyForCreative,
    userController.cashout,
);

tokenRequestRouter.post(
    '/newMessage',

    chatController.addMessage,
);

tokenRequestRouter.post(
    '/getChat',

    chatController.getChat,
);

tokenRequestRouter.post(
    '/getPreview',

    chatController.getPreview,
);

tokenRequestRouter.post(
    '/blackList',

    chatController.blackList,
);

tokenRequestRouter.post(
    '/favorite',

    chatController.favoriteChat,
);

tokenRequestRouter.post(
    '/createCatalog',

    chatController.createCatalog,
);

tokenRequestRouter.post(
    '/updateNameCatalog',

    chatController.updateNameCatalog,
);

tokenRequestRouter.post(
    '/addNewChatToCatalog',

    chatController.addNewChatToCatalog,
);

tokenRequestRouter.post(
    '/removeChatFromCatalog',

    chatController.removeChatFromCatalog,
);

tokenRequestRouter.post(
    '/deleteCatalog',

    chatController.deleteCatalog,
);

tokenRequestRouter.post(
    '/getCatalogs',

    chatController.getCatalogs,
);
tokenRequestRouter.post(
    '/pay',

    basicMiddlewares.onlyForCustomer,
    upload.uploadContestFiles,
    basicMiddlewares.parseBody,
    validators.validateContestCreation,
    userController.payment,
);
module.exports = tokenRequestRouter
