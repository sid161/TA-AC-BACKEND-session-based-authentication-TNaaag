var express = require('express');
const User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',(req,res) =>{
  res.render('userRegister');
})

router.post('/register',(req,res,next) => {
  User.create(req.body,(err,user) => {
    if(err) return next(err)
    res.redirect('/')
  })
})

router.get('/login',(req,res) => {
  var error = req.flash(error)[0]
  res.render('userLogin',{error:error});
})

router.post('/login',(req,res,next) => {
  var {email,password} = req.body;
  console.log(email,password)
  if(!email || !password){
     req.flash("email/password required");
    res.redirect("/users/login")
  }
  User.findOne({email},(err,user) => {
    if(!user){
      req.flash("user not matched");
      res.redirect("/users/login");
    }
    user.verifyPassword(password,(err,result) => {
      if(err) return next(err)
      if(!result){
         req.flash("password did not matched")
        res.redirect("/users/login");
      }

      req.session.userId = user.id;
      res.redirect('/users');
    })
  })

  })

module.exports = router;
