let yup = require('yup');

yup.addMethod(yup.string, "isCategoryExist", function (errorMessage) {
    return this.test(`category-existence`, errorMessage, function (value) {
      const { path, createError } = this;
  
      let { Categories } = global['db'];
     return new Promise((resolve)=>{
            if(value){
                return Categories.findOne({ where: { 
                          title: value  
                        }}).then(user=>{
                            if(!!user?.toJSON()){
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


const addProductCategorySchema ={ 
    body: yup.object().shape({
        title: yup.string()
            .required("please enter a title")
            .min(1, "${path} must be atleast 1 character long")
            .max(255, "First name should be maximum of 255")
            .isCategoryExist('Category is already exist'),
        name: yup.string()
            .required("please enter some name")
            .min(1, "${path} should have one or more than one characters")
            .max(255, "Name should be maximum of 255"),
    }),
    query: yup.object(),
    params: yup.object()
}
module.exports = addProductCategorySchema