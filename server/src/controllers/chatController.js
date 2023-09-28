const Catalog = require('../models/mongoModels/Catalog');
const db = require('../models');
const controller = require('../socketInit');
const conversation = require('../models/conversation');

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
				id: newConversation.id,
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
		const [newConversation, created] = await db.Conversation.findOrCreate({
			where: { participants },
			defaults: {
				participants,
				blackList: [false, false],
				favoriteList: [false, false],
			},
		});



		const messages = await db.Message.findAll({
			where: {
				conversationId: newConversation.id,
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
				id: conversation.conversationId,
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
					conversation.sender = sender.id
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
	try {

		const catalog = await db.Catalog.create({
			userId: req.tokenData.userId,
			catalogName: req.body.catalogName,

		});




		const catalogToChat = await db.CatalogChat.create({
			catalogId: catalog.dataValues.id,
			conversationId: req.body.chatId,
			userId: req.tokenData.userId,
		})

		res.send({catalog,catalogToChat});
	} catch (err) {
		next(err);
	}
};

module.exports.updateNameCatalog = async (req, res, next) => {
	try {
		const updatedCatalog = await db.Catalog.update(
			{ catalogName: req.body.catalogName },
			{
				where: {
					id: req.body.catalogId,
					userId: req.tokenData.userId,
				},
				returning: true,
			}
		);
		const catalog = updatedCatalog[1][0];
		res.send(catalog);
	} catch (err) {
		next(err);
	}
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
	try {
		const catalog = await db.Catalog.findByPk(req.body.catalogId);
		if (!catalog) {
			return res.status(404).send('Catalog not found');
		}

		await catalog.addChat(req.body.chatId);
		res.send(catalog);
	} catch (err) {
		next(err);
	}
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
	try {
		const catalog = await db.Catalog.findByPk(req.body.catalogId);
		if (!catalog) {
			return res.status(404).send('Catalog not found');
		}

		await catalog.removeChat(req.body.chatId);
		res.send(catalog);
	} catch (err) {
		next(err);
	}
};

module.exports.deleteCatalog = async (req, res, next) => {
	try {
		const deletedCatalog = await db.Catalogs.destroy({
			where: {
				id: req.body.catalogId,
				userId: req.tokenData.userId,
			},
		});
		if (deletedCatalog === 0) {
			return res.status(404).send('Catalog not found');
		}
		res.end();
	} catch (err) {
		next(err);
	}
};

module.exports.getCatalogs = async (req, res, next) => {
	try {
		const catalogs = await db.Catalog.findAll({
			where: {
				userId: req.tokenData.userId,
			},
			attributes: ['id', 'catalogName'],
		});
		res.send(catalogs);
	} catch (err) {
		next(err);
	}
};
