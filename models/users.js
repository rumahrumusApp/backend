'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsTo(models.occupation, {
        foreignKey: "occupation_id",
        // as: 'occupation' 
      });

    users.belongsTo(models.role, {
      foreignKey: "role",
      as: 'roles' 
    });

    
  }


  }
  users.init({
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    img_profile: DataTypes.STRING,
    role: DataTypes.INTEGER,
    occupation_id: DataTypes.INTEGER,
    institusi_name: DataTypes.STRING,
    reviewer_id: DataTypes.INTEGER,
    enable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};