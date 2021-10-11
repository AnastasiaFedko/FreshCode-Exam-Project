const bd = require('../../models');
const NotFound = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');

module.exports.updateConversation = async (data, conversationId, transaction) => {
  const [updatedCount, [updatedConversation]] = await bd.Conversations.update(data,
    { where: { id: conversationId }, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update conversation');
  }
  return updatedConversation.dataValues;
};

module.exports.findConversation = async (predicate, needThrowError = true) => {
  const result = await bd.Conversations.findOne(predicate);
  if (!result) {
    if(needThrowError){
      throw new NotFound('conversation with this data didn`t exist');
    }
    else return undefined;
  } else {
    return result.get({ plain: true });
  }
};

module.exports.conversationCreation = async (data) => {
  const newConversation = await bd.Conversations.create(data);
  if (!newConversation) {
    throw new ServerError('server error on conversation creation');
  } else {
    return newConversation.get({ plain: true });
  }
};

module.exports.messageCreation = async (data) => {
  const newMessage = await bd.Messages.create(data);
  if (!newMessage) {
    throw new ServerError('server error on message creation');
  } else {
    const message = newMessage.get({ plain: true });
    const resMessage = {
      conversation: message.conversationId,
      sender: message.userId,
      body: message.body,
      createdAt: message.createAt,
      updatedAt: message.updatedAt,
    };
    return resMessage;
  }
};

module.exports.updateCatalog = async (data, catalogId, transaction) => {
  const [updatedCount, [updatedCatalog]] = await bd.Catalogs.update(data,
    { where: { id: catalogId }, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update catalog');
  }
  return updatedCatalog.dataValues;
};

module.exports.findCatalog = async (predicate) => {
  const result = await bd.Catalogs.findOne(predicate);
  if (!result) {
    throw new NotFound('catalog with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};
