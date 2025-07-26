'use strict';
const config = require('../config/migration.config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: config.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      role_id: {
        type: config.IDENTIFIER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      created_by: {
        type: config.IDENTIFIER,
        allowNull: false,
        defaultValue: 1,
      },
      updated_at: Sequelize.DATE,
      updated_by: config.IDENTIFIER,
      deleted_at: Sequelize.DATE,
    });

    await queryInterface.addIndex('user', {
      fields: ['email'],
    });

    await queryInterface.addIndex('user', {
      fields: ['role_id'],
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('user');
  }
};