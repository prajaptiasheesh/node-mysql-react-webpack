'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('Users', 'email', { 
        type: Sequelize.STRING,
        transaction,
        allowNull: false
      });
      await queryInterface.addColumn('Users', 'password', { 
        type: Sequelize.STRING,
        transaction,
        allowNull: true
      });
      await queryInterface.addColumn('Users', 'userName', { 
        type: Sequelize.STRING,
        transaction,
        allowNull: false
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
