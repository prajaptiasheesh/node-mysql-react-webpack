'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categories.belongsToMany(models.Products, { through: 'ProductCategories', foreignKey: 'catId', otherKey: 'productId' })
      models.Products.belongsToMany(Categories, { through: 'ProductCategories', foreignKey: 'productId', otherKey: 'catId' })
      
      Categories.hasMany(models.ProductCategories, { foreignKey: 'catId' });
      models.ProductCategories.belongsTo(Categories, { foreignKey : 'catId'});

      models.Products.hasMany(models.ProductCategories, { foreignKey: 'productId' })
      models.ProductCategories.belongsTo(models.Products, { foreignKey: 'productId' })

    }
  }
  Categories.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Categories',
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    paranoid: true
  });
  return Categories;
};