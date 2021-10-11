const { Router } = require('express');
const chatRouter = Router();
const checkToken = require('../middlewares/checkToken');
const chatController = require('../controllers/chatController');

chatRouter.use(checkToken.checkToken);

chatRouter.post(
  '/newMessage',
  chatController.addMessage,
);

chatRouter.post(
  '/getChat',
  chatController.getChat,
);

chatRouter.post(
  '/getPreview',
  chatController.getPreview,
);

chatRouter.post(
  '/blackList',
  chatController.blackList,
);

chatRouter.post(
  '/favorite',
  chatController.favoriteChat,
);

chatRouter.post(
  '/createCatalog',
  chatController.createCatalog,
);

chatRouter.post(
  '/updateNameCatalog',
  chatController.updateNameCatalog,
);

chatRouter.post(
  '/addNewChatToCatalog',
  chatController.addNewChatToCatalog,
);

chatRouter.post(
  '/removeChatFromCatalog',
  chatController.removeChatFromCatalog,
);

chatRouter.post(
  '/deleteCatalog',
  chatController.deleteCatalog,
);

chatRouter.post(
  '/getCatalogs',
  chatController.getCatalogs,
);

module.exports = chatRouter;
