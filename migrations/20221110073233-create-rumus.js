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
      kategori: {
        type: Sequelize.STRING
      },
      subkategori: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
      },
      contributor_id: {
        type: Sequelize.STRING
      },
      catatan: {
        type: Sequelize.STRING
      },
      komentar: {
        type: Sequelize.STRING
      },
      status_id: {
        type: Sequelize.STRING
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