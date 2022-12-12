'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       collection.belongsTo(models.rumus, {
        foreignKey: "rumus_id",
        as: 'rumus'
      });

      collection.belongsTo(models.users, {
        foreignKey: "user_id",
        as: 'users'
      });
    }
  }
  collection.init({
    user_id: DataTypes.INTEGER,
    rumus_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'collection',
  });
  return collection;
};