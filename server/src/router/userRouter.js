const userValidationRouter = require("express").Router();
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
userValidationRouter.post(
    '/registration',
    validators.validateRegistrationData,
    userController.registration,
);

userValidationRouter.post(
    '/login',
    validators.validateLogin,
    userController.login,
);

userValidationRouter.get(
    '/getUser',
    checkToken.checkAuth,
);
userValidationRouter.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);
userValidationRouter.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

userValidationRouter.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);


userValidationRouter.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);



module.exports = userValidationRouter