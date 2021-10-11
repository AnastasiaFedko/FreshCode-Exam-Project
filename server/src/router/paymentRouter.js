const { Router } = require('express');
const checkToken = require('../middlewares/checkToken');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const paymentRouter = Router();
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');

paymentRouter.use(checkToken.checkToken);

paymentRouter.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

paymentRouter.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);


module.exports = paymentRouter;
