var router = require('express').Router()
const { checkAuthentication }= require('@middlewares');

router.use('/users',checkAuthentication, require('./users'))
router.use('/authenticate', require('./authenticate'))
router.use('/category', checkAuthentication, require('./category'))
router.use('/products', checkAuthentication, require('./products'))

module.exports = router;