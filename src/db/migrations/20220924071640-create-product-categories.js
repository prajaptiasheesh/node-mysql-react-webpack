'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('ProductCategories', {
            id: {
              type: Sequelize.UUID,
              primaryKey: true,
              defaultValue: Sequelize.UUID4,
            },
            catId: {
              type: Sequelize.UUID,
              allowNull: false
            },
            productId: {
              type: Sequelize.UUID,
              allowNull: false
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE,
              defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE,
              defaultValue: Sequelize.fn('NOW')
            },
            deletedAt:  {
              allowNull: false,
              type: Sequelize.DATE,
              defaultValue: Sequelize.fn('NOW'),
            },
          });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    queryInterface.dropTable('ProductCategories');
  }
};
