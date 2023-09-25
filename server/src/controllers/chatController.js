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
		// Find or create a conversation with the specified participants
		const [newConversation, created] = await db.Conversation.findOrCreate({
			where: { participants },
			defaults: {
				participants,
				blackList: [false, false],
				favoriteList: [false, false],
			},
		});

		// If the conversation was not found or created, return a 404 response


		// Find all messages in the conversation
		const messages = await db.Message.findAll({
			where: {
				conversationId: newConversation.id,
			},
			order: [['createdAt', 'ASC']],
			attributes: ['id', 'userId', 'body', 'conversationId', 'createdAt', 'updatedAt'],
		});

		// Find the interlocutor
		const interlocutor = await db.User.findByPk(req.body.interlocutorId);

		// If the interlocutor was not found, return a 404 response
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
				id: conversation.conversationId,
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
		console.log("🚀 ~ file: chatController.js:209 ~ module.exports.getPreview= ~ formattedConversations:", formattedConversations)
		res.send(formattedConversations);
	} catch (err) {
		next(err);
	}
};




module.exports.blackList = async (req, res, next) => {
	const userId = req.tokenData.userId;
	const participants = req.body.participants;
	const blackListFlag = req.body.blackListFlag;
	const predicate = req.body.participants.indexOf(req.tokenData.userId);


	try {
		const chat = await db.Conversation.findOne({
			where: {
				participants: participants
			},
			attributes: ["blackList"]
		});
		let tb = chat.dataValues.blackList
		if (predicate === 0) {
			tb[0] = blackListFlag;
		}
		else if (predicate === 1) {
			tb[1] = blackListFlag;
		}
		if (chat) {
			const [updatedCount, updatedChat] = await db.Conversation.update(
				{
					blackList: [tb[0], tb[1]],
				},
				{
					where: {
						participants: participants
					},
					returning: true,
				}

			);
			const chats = await db.Conversation.findOne({
				where: {
					participants: participants
				}
			});

			res.send(chats.dataValues);

			const interlocutorId = participants.find(participant => participant !== userId);
			controller.getChatController().emitChangeBlockStatus(interlocutorId, updatedChat);
		} else {
			res.status(404).send("Conversation not found");
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports.favoriteChat = async (req, res, next) => {
	try {
		const favoriteListValue = req.body.favoriteFlag ? req.tokenData.userId : req.tokenData.userId;
		const usrInArr = req.body.participants.indexOf(favoriteListValue)
		const list = await db.Conversation.findAll({
			where: {
				participants: req.body.participants,
			},
			attributes: ["favoriteList"],
		});
		let [tf] = list.map((obj) => {
			return obj.dataValues.favoriteList.map((bool) => { return bool })
		})


		if (usrInArr === 0) {
			tf[0] = req.body.favoriteFlag;
		}
		else if (usrInArr === 1) {
			tf[1] = req.body.favoriteFlag;
		}

		const [updatedCount, updatedChats] = await db.Conversation.update(
			{
				favoriteList: [tf[0], tf[1]],
			},
			{
				where: {
					participants: req.body.participants,
				},
				returning: true,
			}
		);

		if (updatedCount > 0 && updatedChats.length > 0) {
			res.send(updatedChats[0]);
		} else {
			res.status(404).send('Conversation not found');
		}
	} catch (err) {
		next(err);
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
