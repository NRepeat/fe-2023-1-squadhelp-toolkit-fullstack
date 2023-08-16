const transactionRouter = require("express").Router();
const TransactionController = require('../controllers/transactionController');




transactionRouter.route('/allTransactions').get(
    TransactionController.getAllTransactions
)

module.exports = transactionRouter