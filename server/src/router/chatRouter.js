const chatController = require('../controllers/chatController');
const  chatPG= require('../controllers/sockets/chatPGController');
const chatRouter = require('express').Router();
chatRouter.post(
  '/newMessage',
  chatController.addMessage,
);
chatRouter.post(
  '/newMessagePG',
	chatPG.createMessage,
);
chatRouter.post(
  '/getChat',
  chatController.getChat,
);

chatRouter.get(
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
module.exports = chatRouter