const db = require("../../models");

module.exports.createMessage = async (req, res, next) => {
	try {
		const { userId, body, conversationId } = req.body;
		console.log("🚀 ~ file: chatPGController.js:6 ~ module.exports.createMessage= ~ req.body:", req.body)
		console.log("🚀 ~ file: chatPGController.js:6 ~ module.exports.createMessage= ~ userId:", userId)

		const message = await db.Message.create({
			 userId,
			body,
			conversationId,
		});


		res.status(201).json({ message });
	} catch (error) {
		console.error('Error creating message:', error);
		res.status(500).json({ error: 'Internal server error' });
		next()
	}
};
