const { Router } = require('express');
const offerRouter = Router();
const checkToken = require('../middlewares/checkToken');
const userController = require('../controllers/userController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');
offerRouter.use(checkToken.checkToken);

offerRouter.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

offerRouter.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

offerRouter.post(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

offerRouter.get('/getOffers',
  basicMiddlewares.onlyForModerator,
  contestController.getOffers,
);

module.exports = offerRouter;


