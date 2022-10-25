let yup = require('yup');

yup.addMethod(yup.string, "isProductExist", function (errorMessage) {
    return this.test(`product-existence`, errorMessage, function (value) {
      const { path, createError } = this;
  
      let { Products } = global['db'];
     return new Promise((resolve)=>{
            if(value){
                return Products.findOne({ where: { 
                          title: value  
                        }}).then(result=>{
                            if(!!result?.toJSON()){
                                resolve( createError({ path, message: errorMessage }))
                            }else{
                                resolve(true);
                            }
                        }).catch(err=>{
                            resolve( createError({ path, message: err.message }))
                        })
            }else{
                return resolve(true);
            }
        })
    });
  });


const addProductSchema ={ 
    body: yup.object().shape({
        title: yup.string()
            .required("please enter a title")
            .min(1, "${path} must be atleast 1 character long")
            .max(255, "${path} should be maximum of 255")
            .isProductExist('product is already exist'),
        description: yup.string()
                    .required("please enter a some description")
                    .min(1, "${path} must be atleast 1 character long")
                    .max(255, "${path} should be maximum of 255"),
        quantity: yup.number().min(0),
        picture: yup.string().nullable(true),
        video: yup.string().nullable(true),
        createdBy: yup.string().nullable(true)
    }),
    query: yup.object(),
    params: yup.object(),
}
module.exports = addProductSchema