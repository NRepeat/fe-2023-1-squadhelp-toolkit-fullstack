
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('transaction_histories', [
            {
                operation_type: 'INCOME',
                sum: 100.0,
                user_id: 1, 
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                operation_type: 'INCOME',
                sum: 50.0,
                user_id: 1, 
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                operation_type: 'CONSUMPTION',
                sum: 50.0,
                user_id: 2, 
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                operation_type: 'CONSUMPTION',
                sum: 100.0,
                user_id: 2, 
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('transaction_histories', null, {});
    }
};
