let yup = require('yup');
const { Op } = require("sequelize");

yup.addMethod(yup.string, "isEmailOrUsernameNotExist", function (errorMessage) {
    return this.test(`user-existence`, errorMessage, function (value) {
      const { path, createError } = this;
  
      let { Users } = global['db'];
     return new Promise((resolve, reject)=>{
            Users.findOne({ where: { [Op.or]: [
                        { email: value },
                        { userName: value },
                    ]}}).then(user=>{
                        if(!!user?.toJSON()){
                            resolve(true)
                        }else{
                            return resolve(createError({ path, message: "User does not exist" }));
                        }
                    }).catch(err=>{
                        resolve( createError({ path, message: "Something went wrong" }))
                    })
        })
    });
  });


const userLoginSchema ={ 
    body: yup.object().shape({
        userName: yup.string().min(3, "${path} must be minimum 3 characters long").max(255, "${path} should be maximum of 255"),
        password: yup.string().nullable(true)
    }),
    query: yup.object(),
    params: yup.object()
}

module.exports = userLoginSchema