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
      rumus.belongsTo(models.users, {
        foreignKey: "contributor_id",
        as: 'contributor' 
      });

      rumus.belongsTo(models.status, {
        foreignKey: "status_id",
        as: 'status' 
      });

      rumus.belongsTo(models.category, {
        foreignKey: "category_id",
        as: 'category' 
      });

      rumus.belongsTo(models.sub_category, {
        foreignKey: "sub_category_id",
        as: 'subcategory' 
      });

      
    }
  }
  rumus.init({
    title: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    sub_category_id: DataTypes.INTEGER,
    img_ilustrasi: DataTypes.STRING,
    img_rumus: DataTypes.STRING,
    img_contoh: DataTypes.STRING,
    reviewer_id: DataTypes.INTEGER,
    contributor_id: DataTypes.INTEGER,
    catatan: DataTypes.STRING,
    komentar: DataTypes.STRING,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rumus',
  });
  return rumus;
};