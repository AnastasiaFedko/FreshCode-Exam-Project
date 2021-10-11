const { Router } = require('express');
const userRouter = Router();
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const upload = require('../utils/fileUpload');

userRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

userRouter.post(
  '/login',
  validators.validateLogin,
  userController.login);

userRouter.post(
  '/recoverPassword',
  validators.validatePasswordRecover,
  hashPass,
  userController.recoverPassword,
);

userRouter.post(
  '/getUser',
  checkToken.checkAuth,
);

userRouter.post(
  '/updateUser',
  upload.uploadAvatar,
  userController.updateUser,
);

module.exports = userRouter;
