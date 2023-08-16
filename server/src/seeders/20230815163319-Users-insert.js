const bcrypt = require('bcrypt');
const { SALT_ROUNDS, CUSTOMER, CREATOR } = require('../constants');


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Buyer',
        lastName: 'Buyer',
        displayName: 'Buyer',
        password: bcrypt.hashSync('buyer@gmail.com', SALT_ROUNDS),
        email: 'buyer@gmail.com',
        role: CUSTOMER,
      },
      {
        firstName: 'Creator',
        lastName: 'Creator',
        displayName: 'Creator',
        password: bcrypt.hashSync('creator@gmail.com', SALT_ROUNDS),
        email: 'creator@gmail.com',
        role: CREATOR,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
