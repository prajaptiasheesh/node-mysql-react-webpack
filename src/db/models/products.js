'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    picture: {
      type: DataTypes.STRING
    },
    video: {
      type: DataTypes.STRING
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Products',
    timestamps: true,
    underscored: false,
    paranoid: true,
    freezeTableName: true
  });
  return Products;
};