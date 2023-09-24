const Conversation = require('../models/mongoModels/conversation');
const Message = require('../models/mongoModels/Message');
const Catalog = require('../models/mongoModels/Catalog');
const db = require('../models');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const _ = require('lodash');
const { Op } = require('sequelize')

module.exports.addMessage = async (req, res, next) => {
	const participants = [req.tokenData.userId, req.body.recipient];
	participants.sort(
		(participant1, participant2) => participant1 - participant2);

	try {
		const [newConversation, created] = await db.Conversation.findOrCreate({
			where: { participants },
			defaults: {
				participants,
				blackList: [false, false],
				favoriteList: [false, false],
			},
		});
		const message = await db.Message.create({
			userId: req.tokenData.userId,
			body: req.body.messageBody,
			conversationId: newConversation.id,
		});

		message.participants = participants;
		const interlocutorId = participants.filter(
			(participant) => participant !== req.tokenData.userId)[0];
		const preview = {
			id: newConversation.id,
			sender: req.tokenData.userId,
			text: req.body.messageBody,
			createAt: message.createdAt,
			participants,
			blackList: newConversation.blackList,
			favoriteList: newConversation.favoriteList,
		};
		controller.getChatController().emitNewMessage(interlocutorId, {
			message,
			preview: {
				_id: newConversation._id,
				sender: req.tokenData.userId,
				text: req.body.messageBody,
				createAt: message.createdAt,
				participants,
				blackList: newConversation.blackList,
				favoriteList: newConversation.favoriteList,
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
	participants.sort((participant1, participant2) => participant1 - participant2);

	try {
		const conversation = await db.Conversation.findOne({
			where: {
				participants: {
					[Op.contains]: participants, 
				},
			},
		});

		if (!conversation) {
			return res.status(404).send({ message: 'Conversation not found' });
		}


		const messages = await db.Message.findAll({
			where: {
				conversationId: conversation.id,
			},
			order: [['createdAt', 'ASC']], 
			attributes: ['id', 'userId', 'body', 'conversationId', 'createdAt', 'updatedAt'],
		});

		const interlocutor = await db.User.findByPk(req.body.interlocutorId);

		if (!interlocutor) {
			return res.status(404).send({ message: 'Interlocutor not found' });
		}

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
  
    async function findLastMessageInConversation(conversationId) {
      try {
        const lastMessage = await db.Message.findOne({
          where: {
            conversationId: conversationId,
          },
          order: [['createdAt', 'DESC']], 
        });

        return lastMessage;
      } catch (err) {
        throw err;
      }
    }

    const conversations = await db.Message.findAll({
      attributes: ['conversationId'], 
      where: {
        '$conversationData.participants$': {
          [db.Sequelize.Op.contains]: [req.tokenData.userId],
        },
      },
      include: [
        {
          model: db.Conversation,
          as: 'conversationData',
          attributes: ['id', 'participants', 'blackList', 'favoriteList'],
        },
      ],

      group: [
        'conversationId',
        'conversationData.id',
        'conversationData.participants',
        'conversationData.blackList',
        'conversationData.favoriteList',
      ],
    });

    const formattedConversations = await Promise.all(conversations.map(async conversation => {

      const lastMessage = await findLastMessageInConversation(conversation.conversationId);
    

      return {
        _id: conversation.conversationId,
        sender: conversation.conversationData.id,
        text: lastMessage ? lastMessage.body : '',
        createAt: lastMessage ? lastMessage.createdAt : null,
        participants: conversation.conversationData.participants,
        blackList: conversation.conversationData.blackList,
        favoriteList: conversation.conversationData.favoriteList,
      };
    }));

    const interlocutors = [];
    formattedConversations.forEach(conversation => {
      interlocutors.push(conversation.participants.find(
        participant => participant !== req.tokenData.userId
      ));
    });

    const senders = await db.User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

    formattedConversations.forEach(conversation => {
      senders.forEach(sender => {

        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.id,
            firstName: sender.firstName,
            lastName: sender.lastName,
            displayName: sender.displayName,
            avatar: sender.avatar,
          };
        }
      });
    });

    res.send(conversations);	
  } catch (err) {
    next(err);
  }
};



module.exports.blackList = async (req, res, next) => {
	const predicate = 'blackList.' +
		req.body.participants.indexOf(req.tokenData.userId);
	try {
		const chat = await Conversation.findOneAndUpdate(
			{ participants: req.body.participants },
			{ $set: { [predicate]: req.body.blackListFlag } }, { new: true });
		res.send(chat);
		const interlocutorId = req.body.participants.filter(
			(participant) => participant !== req.tokenData.userId)[0];
		controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
	} catch (err) {
		res.send(err);
	}
};

module.exports.favoriteChat = async (req, res, next) => {
	const predicate = 'favoriteList.' +
		req.body.participants.indexOf(req.tokenData.userId);
	try {
		const chat = await Conversation.findOneAndUpdate(
			{ participants: req.body.participants },
			{ $set: { [predicate]: req.body.favoriteFlag } }, { new: true });
		res.send(chat);
	} catch (err) {
		res.send(err);
	}
};

module.exports.createCatalog = async (req, res, next) => {
	const catalog = new Catalog({
		userId: req.tokenData.userId,
		catalogName: req.body.catalogName,
		chats: [req.body.chatId],
	});
	try {
		await catalog.save();
		res.send(catalog);
	} catch (err) {
		next(err);
	}
};

module.exports.updateNameCatalog = async (req, res, next) => {
	try {
		const catalog = await Catalog.findOneAndUpdate({
			_id: req.body.catalogId,
			userId: req.tokenData.userId,
		}, { catalogName: req.body.catalogName }, { new: true });
		res.send(catalog);
	} catch (err) {
		next(err);
	}
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
	try {
		const catalog = await Catalog.findOneAndUpdate({
			_id: req.body.catalogId,
			userId: req.tokenData.userId,
		}, { $addToSet: { chats: req.body.chatId } }, { new: true });
		res.send(catalog);
	} catch (err) {
		next(err);
	}
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
	try {
		const catalog = await Catalog.findOneAndUpdate({
			_id: req.body.catalogId,
			userId: req.tokenData.userId,
		}, { $pull: { chats: req.body.chatId } }, { new: true });
		res.send(catalog);
	} catch (err) {
		next(err);
	}
};

module.exports.deleteCatalog = async (req, res, next) => {
	try {
		await Catalog.remove(
			{ _id: req.body.catalogId, userId: req.tokenData.userId });
		res.end();
	} catch (err) {
		next(err);
	}
};

module.exports.getCatalogs = async (req, res, next) => {
	try {
		const catalogs = await Catalog.aggregate([
			{ $match: { userId: req.tokenData.userId } },
			{
				$project: {
					_id: 1,
					catalogName: 1,
					chats: 1,
				},
			},
		]);
		res.send(catalogs);
	} catch (err) {
		next(err);
	}
};
