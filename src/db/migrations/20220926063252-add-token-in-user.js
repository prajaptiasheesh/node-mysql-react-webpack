'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.addColumn('Users', 'token', { type: Sequelize.STRING, allowNull: true });
      await queryInterface.addColumn('Users', 'refreshToken', { type: Sequelize.STRING, allowNull: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.removeColumn('Users', 'token')
      await queryInterface.removeColumn('Users', 'refreshToken')
  }
};
