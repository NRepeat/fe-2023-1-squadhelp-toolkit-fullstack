
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('transaction_histories', [
            {
                operation_type: 'customer',
                sum: 100.0,
                user_id: 4, 
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                operation_type: 'creator',
                sum: 50.0,
                user_id: 3, 
                created_at: new Date(),
                updated_at: new Date(),
            },
           
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('transaction_histories', null, {});
    }
};
