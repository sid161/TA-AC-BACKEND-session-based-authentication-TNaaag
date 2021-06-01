var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to homepage ');
});



router.get('/register',(req,res) => {
  var error = req.flash('error');
  res.render('userRegister');
})

router.post('/register',(req,res,next) => { 
  User.create(req.body,(err,user) => {
    if(err) return next(err)
    req.flash('success',"Registration Succesful");
    res.redirect('/users/register');
  })

})

router.get('/login',(req,res) => {
  res.render('userLogin');
})

router.post('/login',(req,res,next) => {
  var {email,password} = req.body;
  if(!email || !password){
    req.flash('error',"fields cant be empty!!")
    res.redirect('/users/login');
  }
  User.findOne({email},(err,user) => {
    if(err) return next(err)
    if(!user) {
      req.flash('error',"user doesnt exist")
      res.redirect('/users/login');
    }
    user.verifyPassword(password,(err,result) => {
      if(err) return next(err)
      if(!result){
        req.flash('error','password incorrect')
        res.redirect('/users/login');
      }
      req.session.userId = user.id;
      res.redirect('/users'); 
    })
  })
})



module.exports = router;


