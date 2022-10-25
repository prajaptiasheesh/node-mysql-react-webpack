'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // through table does not need to create manually 
      // because it will be created by sequelize automatically and
      // will be used for eager loading
    }
  }
  Roles.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
    underscored: false,
    freezeTableName: true,
    paranoid: true,
    timestamps: true
  });
  return Roles;
};