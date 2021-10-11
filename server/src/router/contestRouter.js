const { Router } = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');
const checkToken = require('../middlewares/checkToken');
const contestRouter = Router();


contestRouter.get(
  '/',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

contestRouter.get(
  '/customersContests',
  checkToken.checkToken,
  contestController.getCustomersContests,
);

contestRouter.get(
  '/:contestId',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

contestRouter.put(
  '/:contestId',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest,
);

contestRouter.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);

contestRouter.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);

module.exports = contestRouter;
