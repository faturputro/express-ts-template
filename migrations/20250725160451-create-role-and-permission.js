'use strict';
const config = require('../config/migration.config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('role', {
      id: config.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      updated_at: Sequelize.DATE,
      updated_by: config.IDENTIFIER,
      deleted_at: Sequelize.DATE,
    });

    await queryInterface.createTable('permission', {
      id: config.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      updated_at: Sequelize.DATE,
      updated_by: config.IDENTIFIER,
      deleted_at: Sequelize.DATE,
    });

    await queryInterface.createTable('role_permission', {
      id: config.PRIMARY_KEY,
      role_id: {
        type: config.IDENTIFIER,
        allowNull: false,
      },
      permission_id: {
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
      },
      updated_at: Sequelize.DATE,
      updated_by: config.IDENTIFIER,
      deleted_at: Sequelize.DATE,
    });

    await queryInterface.createTable('user_permission', {
      id: config.PRIMARY_KEY,
      user_id: {
        type: config.IDENTIFIER,
        allowNull: false,
      },
      permission_id: {
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
      },
      updated_at: Sequelize.DATE,
      updated_by: config.IDENTIFIER,
      deleted_at: Sequelize.DATE,
    });

    await queryInterface.createTable('user_session', {
      id: config.PRIMARY_KEY,
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_agent: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    });

    await queryInterface.createTable('user_token_request', {
      id: config.PRIMARY_KEY,
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: Sequelize.ENUM(['reset_password', 'verification']),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    });

    await queryInterface.addIndex('user_token_request', {
      name: 'index_user_token_request_user_id',
      fields: ['user_id'],
    });

    await queryInterface.addIndex('user_token_request', {
      name: 'index_user_token_request_key',
      fields: ['key'],
    });

    await queryInterface.addIndex('role', {
      name: 'index_role_slug',
      fields: ['slug'],
    });

    await queryInterface.addIndex('role', {
      name: 'index_role_name',
      fields: ['name'],
    });

    await queryInterface.addIndex('permission', {
      name: 'index_permission_name',
      fields: ['name'],
    });

    await queryInterface.addIndex('permission', {
      name: 'index_permission_slug',
      fields: ['slug'],
    });

    await queryInterface.addIndex('role_permission', {
      name: 'index_role_permission_role_id',
      fields: ['role_id'],
    });

    await queryInterface.addIndex('role_permission', {
      name: 'index_role_permission_permission_id',
      fields: ['permission_id'],
    });

    await queryInterface.addIndex('user_permission', {
      name: 'index_user_permission_permission_id',
      fields: ['permission_id'],
    });

    await queryInterface.addIndex('user_permission', {
      name: 'index_user_permission_user_id',
      fields: ['user_id'],
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('role');
    await queryInterface.dropTable('permission');
    await queryInterface.dropTable('role_permission');
    await queryInterface.dropTable('user_permission');
    await queryInterface.dropTable('user_token_request');
  }
};
