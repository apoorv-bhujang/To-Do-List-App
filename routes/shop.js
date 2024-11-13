const express = require('express');
const path = require('path');
const router = express.Router();

const basePath = require('../util/path');
const productsController = require('../controllers/products')

router.get('/display', productsController.getDisplayProducts);
router.get('/', productsController.getProducts);


module.exports = router;