const { addEditUserSchema, userLoginSchema } = require('./users')
const { addProductCategorySchema } = require('./product-category')
const { addProductSchema } = require('./products')
const validate = (allSchema)=>async (req, res, next)=>{

    let query = req.query || {};
    let body = req.body || {};
    let params = req.params || {};

        try {
            const validateBody = allSchema['body'];
            const validateQuery = allSchema['query'];
            const validateParams = allSchema['params'];
            const validateOptions = { abortEarly: false }
            validateBody.validate(body, validateOptions)
            .then(()=>{
                validateQuery.validate(query, validateOptions)
                .then(()=>{
                    validateParams.validate(params, validateOptions)
                    .then(()=>{
                        // when all validations ran successfully
                        next();
                    }).catch(err=>{ res.status(500).json(generateFormattedErrors(err) ); })
                }).catch(err=>{ res.status(500).json(generateFormattedErrors(err) ); })
            }).catch(err=>{ res.status(500).json(generateFormattedErrors(err)); })

        } catch (err) {
            res.status(500).json(JSON.stringify(err) );
        }
}

const generateFormattedErrors = (err)=>{
    const errors = {};
        for (let i of err.inner)
            errors[i.path] = i.message; // { propName: 'error msg' }
        return errors;
}

module.exports ={ 
    validate,
    addEditUserSchema,
    userLoginSchema,
    addProductCategorySchema,
    addProductSchema
};