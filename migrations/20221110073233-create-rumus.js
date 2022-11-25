'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rumus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      sub_category_id: {
        type: Sequelize.INTEGER
      },
      img_ilustrasi: {
        type: Sequelize.STRING
      },
      img_rumus: {
        type: Sequelize.STRING
      },
      img_contoh: {
        type: Sequelize.STRING
      },
      reviewer_id: {
        type: Sequelize.INTEGER
      },
      contributor_id: {
        type: Sequelize.INTEGER
      },
      catatan: {
        type: Sequelize.STRING
      },
      komentar: {
        type: Sequelize.STRING
      },
      status_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rumus');
  }
};