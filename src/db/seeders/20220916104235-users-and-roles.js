'use strict';
var rolesJson = require('../../jsons/roles');
const { v4: uuidv4 } = require('uuid');
const { hashContent } = require('../../utils');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
     rolesJson = rolesJson.map(item=>{
      return {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uuidv4()
      }
    }) 
    let transaction = null;
    try{
      // insertion of roles
      let transaction = await queryInterface.sequelize.transaction();
      let [existingRoles] = await queryInterface.sequelize.query("select * from Roles");
      if(!existingRoles.length){
        await queryInterface.bulkInsert('Roles', rolesJson, {
          transaction
        })
          let pwd = await hashContent('12345678');
          let [userId1] = [uuidv4()] 

            let [existingUsers] = await queryInterface.sequelize.query("select * from Users where email='ashu@yopmail.com'");
            let admin = rolesJson.find(item=>item.name === 'SUPER_ADMIN')
            
            if(!existingUsers.length){
            
                await queryInterface.bulkInsert('Users', [{
                    id: userId1,
                    "userName": "asheesh",
                    "password": pwd.password,
                    "email": "ashu@yopmail.com",
                    "firstName": "prajapati",
                    "salt": pwd.salt,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  }], { transaction });
                
                
                  await queryInterface.bulkInsert("UserRoles", 
                  [{ 
                    id: uuidv4(), 
                    RoleId: admin.id, 
                    UserId: userId1, 
                    createdAt: new Date(),
                  }], { transaction })
                  transaction.commit()
            }else{
            
            
                await queryInterface.bulkInsert("UserRoles", 
                [{ 
                  id: uuidv4(), 
                  RoleId: admin?.id, 
                  UserId: existingUsers[0].id,
                  createdAt: new Date(),
                }], { transaction })
                await transaction.commit();            
            }
          /** END */
      }
    }catch(err){
      await transaction?.rollback()
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
