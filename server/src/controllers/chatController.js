const db = require('../models');
const userQueries = require('./queries/userQueries');
const chatQueries = require('./queries/chatQueries');
const controller = require('../socketInit');
const _ = require('lodash');
const Sequelize = require('sequelize');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  const favoriteList = req.body.favoriteList;
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  try {
    let conversation = await chatQueries.findConversation(
      { where: { participants } }, false);
    if (conversation) {
      await chatQueries.updateConversation({ participants, blackList: [false, false], favoriteList: favoriteList ? favoriteList : [false, false] }, conversation.id);
    }
    else {
      conversation = await chatQueries.conversationCreation({ participants, blackList: [false, false], favoriteList: favoriteList ? favoriteList : [false, false] });
    }

    const message = await chatQueries.messageCreation({ userId: req.tokenData.userId, body: req.body.messageBody, conversationId: conversation.id });
    message.participants = participants;

    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId)[0];
    const preview = {
      _id: conversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: conversation.blackList,
      favoriteList: conversation.favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        _id: conversation.id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: conversation.blackList,
        favoriteList: conversation.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};


module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  try {
    const conversation = await chatQueries.findConversation({
      where: { participants } }, false);
    let messages = [];
    if (conversation) {
      messages = await db.Messages.findAll({
        where: {
          conversationId: conversation.id,
        },
        order: [['createdAt', 'asc']],
        attributes: [['id', '_id'], ['userId', 'sender'], 'body', ['conversationId', 'conversation'], 'createdAt', 'updatedAt'],
      });
    }

    const interlocutor = await userQueries.findUser(
      { id: req.body.interlocutorId });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversations = await db.Conversations.findAll({
      where: {
        participants: {
          [Sequelize.Op.contains]: [req.tokenData.userId],
        },
      },
      order: [['Messages', 'createdAt', 'desc']],
      attributes: [['id', '_id'], 'participants', 'blackList', 'favoriteList' ],
      include: [
        {
          model: db.Messages,
          required: true,
          attributes: ['body', 'userId', 'createdAt'],
          duplicating: false,
        },
      ],
    });

    const resConversations = [];

    conversations.forEach((conversation) => {
      resConversations.push(conversation.get({ plain: true }));
    });

    resConversations.forEach((conversation) => {
      if(conversation.Messages){
        conversation.Messages.sort((a, b) => b.createdAt - a.createdAt);
        conversation['sender'] = conversation.Messages[0].userId;
        conversation.text = conversation.Messages[0].body;
        conversation.createAt = conversation.Messages[0].createdAt;
      }
      delete conversation.Messages;
    });


    const interlocutors = [];
    resConversations.forEach(conversation => {
      interlocutors.push(conversation.participants.find(
        (participant) => participant !== req.tokenData.userId));
    });
    const senders = await db.Users.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    resConversations.forEach((conversation) => {
      senders.forEach(sender => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });
    res.send(resConversations);
  } catch (err) {
    next(err);
  }
};


module.exports.blackList = async (req, res, next) => {
  try {
    const index = req.body.participants.indexOf(req.tokenData.userId);
    const conversation = await chatQueries.findConversation({
      where: { participants: req.body.participants } });
    conversation.blackList[index] = req.body.blackListFlag;
    const updatedConversation = await chatQueries.updateConversation({ blackList: conversation.blackList }, conversation.id);
    res.send(updatedConversation);
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId)[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, conversation);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const index = req.body.participants.indexOf(req.tokenData.userId);
    const conversation = await chatQueries.findConversation({
      where: { participants: req.body.participants } });
    conversation.favoriteList[index] = req.body.favoriteFlag;
    const updatedConversation = await chatQueries.updateConversation({ favoriteList: conversation.favoriteList }, conversation.id);
    res.send(updatedConversation);
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    await db.Catalogs.create(
      {
        userId: req.tokenData.userId,
        catalogName: req.body.catalogName,
        chats: [ req.body.chatId ],
      }).then((catalog) => {
      res.send(catalog);
    });
  } catch (err) {
    next(err);
  }
};


module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const catalog = await chatQueries.findCatalog({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });
    const updatedCatalog = await chatQueries.updateCatalog({ catalogName: req.body.catalogName }, catalog.id);
    res.send(updatedCatalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  const catId = req.body.catalogId;
  try {
    const catalog = await chatQueries.findCatalog({
      where: {
        id: catId,
        userId: req.tokenData.userId,
      },
    });
    catalog.chats.push(req.body.chatId);
    const updatedCatalog = await chatQueries.updateCatalog({
      chats: catalog.chats,
    }, catalog.id);
    res.send(updatedCatalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const catalog = await chatQueries.findCatalog({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });

    const index = catalog.chats.findIndex((chat) => chat.id === req.body.chatId);
    catalog.chats.splice(index, 1);
    const updatedCatalog = await chatQueries.updateCatalog({
      chats: catalog.chats }, catalog.id);

    res.send(updatedCatalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    await db.Catalogs.destroy({ where: { id: req.body.catalogId, userId: req.tokenData.userId } });
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await db.Catalogs.findAll({
      where: { userId: req.tokenData.userId },
      attributes: [['id', '_id'], 'userId', 'catalogName', 'chats'],
    });

    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
