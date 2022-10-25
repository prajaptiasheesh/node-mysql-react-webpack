'use strict';
const {
  Model
} = require('sequelize');
const { hashContent, isValidHashUsingSalt } = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsToMany(models.Roles, { through: 'UserRoles', foreignKey: 'userId', otherKey: 'roleId' });
      Users.belongsToMany(models.Products, { through: 'UserProducts', foreignKey: 'userId', otherKey: 'productId' });
      /** foreign key is must otherwise sequilize will try to create a camel cased id example: UserId */
      Users.hasMany(models.UserRoles, { foreignKey: 'userId' });
      models.UserRoles.belongsTo(Users, { foreignKey: 'userId' });

      Users.hasMany(models.UserProducts, { foreignKey: 'productId' });
      models.UserProducts.belongsTo(Users, { foreignKey: 'productId' });
    }

    async validatePassword(password){
      return await isValidHashUsingSalt(password, this.password, this.salt)
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    }    
  }, {
    sequelize,
    modelName: 'Users',
    underscored: false,
    freezeTableName: true,
    paranoid: true,
    timestamps: true
  });

  Users.beforeSave(async (user) => {
    const { password, salt, error }= await hashContent(user.password);
    if(error) return;
    user.password = password;
    user.salt = salt;
  })

  return Users;
};