var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Product = require('../models/Product');


router.get('/new',(req,res) => {
    res.render('createProduct.ejs');
})

router.post('/',(req,res,next) => {
    var id = req.session.userId;
    Product.create(req.body,(err,product) => {
        if(err) return next(err)
        User.findByIdAndUpdate(id,{productId: product.id}, (err, user) =>{
            if(err) return next(err)
            res.redirect('/products');
        })
        
    })
})


router.get('/:id', (req,res,next) => {
    var id = req.params.id;
    Product.findById(id,(err,product) => {
        if(err) return next(err);
        User.findById(session,(err,user) => {
            res.render('singleItem', {product,session});
        })
        
    })
})

router.get('/:id/delete',(req,res,next) => {
    var id = req.params.id;
    Product.findByIdAndDelete(id,(err,deletedProduct) => {
        if(err) return next(err)
        res.redirect('/products');
    })
})

router.get("/:id/edit",(req,res,next) => {
    var id = req.params.id;
    Product.findById(id,(err,product) => {
        if(err) return next(err)
        res.render('updateProduct',{product})
    })
})

router.post("/:id/edit",(req,res,next) => {
    var id = req.params.id;
    Product.findByIdAndUpdate((err,product) => {
        if(err) return next (err)
        res.redirect('/products/' + id)
    })
})

router.get("/:id/likes",(req,res,next) => {
    var id = req.params.id;
    Product.findByIdAndUpdate(id, {$inc : {likes:1}}, (err,product) => {
        if(err) return next(err)
        res.redirect('/products/' + id);
    })
})

router.get("/:id/dislike",(req,res,next) => {
    var id = req.params.id;
    Product.findByIdAndUpdate(id, {$inc: {likes:-1}},(err,product) => {
        if(err) return next(err)
        res.redirect('/products/' + id);
    })
})


module.exports = router;

