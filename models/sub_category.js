'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sub_category.belongsTo(models.category, {
        foreignKey: "category_id",
        as: 'category' 
      });
    }
  }
  sub_category.init({
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sub_category',
  });
  return sub_category;
};