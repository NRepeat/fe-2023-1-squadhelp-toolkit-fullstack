const { TransactionHistory } = require('../models');

module.exports.getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await TransactionHistory.findAll()
        let income = 0;
        let consumption = 0;
        transactions.forEach(transaction => {
            if (transaction.operationType === 'INCOME') {
              income += transaction.sum;
            } else if (transaction.operationType === 'CONSUMPTION') {
              consumption += transaction.sum;
            }
          });
          const financialStatement = { INCOME: income, CONSUMPTION: consumption };
        res.send({ data: financialStatement})
    } catch (error) {
        next(error)
    }
}