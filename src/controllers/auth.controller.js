
const { Op } = require("sequelize");
const { isValidHashUsingSalt, hashContent } = require('../utils');
const JwtService = require('../services/jwt.service')
const register = async (body, params, query)=>{

    const { Users, Roles, UserRoles, sequelize } = global['db'];
    // First, we start a transaction from your connection and save it into a variable
    const t = await sequelize.transaction();
    const role = await Roles.findOne({
        when: { id: body.roleId }
    })
    let user = null;

    return Users.create({ 
            firstName: body.firstName, 
            lastName: body.lastName, 
            password: body.password, 
            email: body.email, 
            userName: body.userName, 
        }, { transaction: t })
        .then(result=>{
            user = result
            return UserRoles.create({ roleId: role.id, userId: result.id }, {
                transaction: t
            })
        }).then(async()=>{
            await t.commit()
            let { password, salt, ...userJson} = user.toJSON();
            userJson.role = role;
            return JwtService.generateToken(userJson)
                .then(({ token })=>{
                    return {...userJson, token};
                })
        }).catch(async(err)=>{
            await t.rollback();
            throw err;
        });
}

const login = async (body, params, query)=>{

    const { Users, Roles, sequelize } = global['db'];
    // First, we start a transaction from your connection and save it into a variable

    let conditions = []

    if(body.email && body.userName){
        conditions.push({ email: body.email })
        conditions.push({ userName: body.userName })
    }else if(body.email){
        conditions = { email: body.email }
    }else if(body.userName){
        conditions = { userName: body.userName }
    }
    return Users.findOne({ where : {
                  ...(conditions.length > 1 ? {[Op.or]: conditions}: conditions),
            }, include: { 
                model: Roles, 
                through: {
                    attributes: []
                }
            }}).then(async(result)=>{
            
                if(result){
                    let { password, salt, ...user} = result.toJSON();                    
                    let enteredPwd = body.password;
                    if(!isValidHashUsingSalt(enteredPwd, password, salt)){
                        throw new Error("password or email doesn't match");
                    }else{
                       return JwtService.generateToken(user)
                       .then(({ token })=>{
                            let hashedToken = hashContent()
                           return { token }
                       })
                    }
                }else{
                    throw new Error("User doesn't exist");
                }
            });
}

module.exports = {
    registerController: register,
    loginController: login
}