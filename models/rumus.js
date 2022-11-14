'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rumus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rumus.init({
    title: DataTypes.STRING,
    kategori: DataTypes.STRING,
    subkategori: DataTypes.STRING,
    img_ilustrasi: DataTypes.STRING,
    img_rumus: DataTypes.STRING,
    img_contoh: DataTypes.STRING,
    reviewer_id: DataTypes.STRING,
    contributor_id: DataTypes.STRING,
    catatan: DataTypes.STRING,
    komentar: DataTypes.STRING,
    status_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rumus',
  });
  return rumus;
};