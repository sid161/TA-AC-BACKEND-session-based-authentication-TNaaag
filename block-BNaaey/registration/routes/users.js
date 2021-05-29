var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});



router.get('/register',(req,res) => {
  // if(err) return next(err)
  res.render('userRegister');
})

router.post('/register',(req,res,next) => {
  User.create(req.body,(err,user) => {
    console.log(req.body);
    if(err) return next(err)
    res.redirect('/');
  })

})

router.get('/login',(req,res) => {
  res.render('login');
})

router.post('/login',(req,res,next) => {
  var{email,password} = req.body;
  if(!email || !password){
    res.redirect("/users/login");
  }
  User.findOne({email},(err,user) => {
    if(err) return next(err)
    if(!user){
      return res.redirect('/users/login')
    }
    user.verifyPassword(password,(err,result) => {
      if(err) return next(err)
      if(!result){
        return res.redirect('/users/login');
      }
      req.session.userId = user.userId;
      res.redirect('/');
    })
  })
})

module.exports = router;