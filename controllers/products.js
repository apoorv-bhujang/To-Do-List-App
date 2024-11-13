// This hold all product related logic

const Product = require('../models/product');

exports.getAddProduct = (req,res) => {
    res.render('add-product', {docTitle: 'Add-Product', editing: false}); 
   }



exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const date = req.body.date;
    const product = new Product({
      title: title,
      date: date
    });
    console.log(product);
    product
      .save()
      .then(result => {
        // console.log(result);
        console.log('Created Product');
        res.redirect('/shop');
      })
      .catch(err => {
        console.log(err);
      });
  };

exports.getProducts = (req, res, next) => {
    Product.find()
      .then(products => {
        console.log(products);
        products.reverse();
        res.render('shop', {
          prods: products,
          docTitle: 'To Do List'
        });
      })
      .catch(err => console.log(err));
  };

  exports.getDisplayProducts = (req, res, next) => {
    Product.find()
      .then(products => {
      
        console.log(products);
     
        products.reverse();
        res.render('display', {
          prods: products,
          docTitle: 'To Do List'
        });
      })
      .catch(err => console.log(err));
  };

  exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/shop');
      })
      .catch(err => console.log(err));
  };
  

  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/shop');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product => {
        if (!product) {
          return res.redirect('/shop');
        }
        res.render('add-product', {
          docTitle: 'Edit Product',
          editing: editMode,
          product: product
        });
      })
      .catch(err => console.log(err));
  };


  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedDate= req.body.date;
  
    Product.findById(prodId)
      .then(product => {
        product.title = updatedTitle;
        product.date = updatedDate;
        return product.save();
      })
      .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/shop');
      })
      .catch(err => console.log(err));
  };