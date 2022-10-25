let yup = require('yup');
const { Op } = require("sequelize");

yup.addMethod(yup.string, "isEmailOrUsernameExist", function (errorMessage) {
    return this.test(`user-existence`, errorMessage, function (value) {
      const { path, createError } = this;
  
      let { Users } = global['db'];
     return new Promise((resolve, reject)=>{
            Users.findOne({ where: { [Op.or]: [
                        { email: value },
                        { userName: value },
                    ]}}).then(user=>{
                        if(!!user?.toJSON()){
                            resolve( createError({ path, message: errorMessage }))
                        }else{
                            return resolve(true);
                        }
                    }).catch(err=>{
                        resolve( createError({ path, message: err.message }))
                    })
        })
    });
  });


const addEditUserSchema ={ 
    body: yup.object().shape({
        firstName: yup.string().min(1, "${path} must be atleast 1 character long").max(255, "First name should be maximum of 255"),
        lastName: yup.string().min(1, "${path} must be atleast 1 character long").max(255, "First name should be maximum of 255"),
        password: yup.string().min(8, 'password should be of 8 characters long'),
        email: yup.string().email("Please enter a valid email").
        isEmailOrUsernameExist('${path} is already exist'),
        userName: yup.string().min(3, "${path} must be minimum 3 characters long").max(255, "First name should be maximum of 255")
    }),
    query: yup.object(),
    params: yup.object()
}

module.exports = addEditUserSchema