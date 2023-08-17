const userValidationRouter = require("express").Router();
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');


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

userValidationRouter.post(
    '/getUser',
    checkToken.checkAuth,
);










module.exports = userValidationRouter