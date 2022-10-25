var express = require('express');
var router = express.Router();
var { formatResponse } = require('@helpers')
const { addCategoryController, listCategoryController, deleteCategoryController } = require('@controllers');
const { validate, addProductCategorySchema }= require('@validators');

router.post('/create', validate(addProductCategorySchema), formatResponse(addCategoryController));

router.get('/get-by-filters', formatResponse(listCategoryController));

router.delete('/delete/:catId', formatResponse(deleteCategoryController));

module.exports = router;