const express = require('express');
const path = require('path');
const router = express.Router();

const basePath = require('../util/path');
const { title } = require('process');
const productsController = require('../controllers/products')



// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);   // we are not executing getAddProduct, so dont add ()

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

// /admin/add-product => POST
router.post('/delete-item', productsController.postDeleteProduct);

router.get('/edit-product/:productId', productsController.getEditProduct);

router.post('/edit-product', productsController.postEditProduct);


module.exports = router;