var express = require('express');
var router = express.Router();
var { formatResponse } = require('@helpers')
const { addProductController, listProductController, mapProductToCategoryController } = require('@controllers');

const { validate, addProductSchema }= require('@validators');

router.post('/create', validate(addProductSchema), formatResponse(addProductController));
router.get('/get-by-filters', formatResponse(listProductController));
router.post('/add-product-category', formatResponse(mapProductToCategoryController));

module.exports = router;