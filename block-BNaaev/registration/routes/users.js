var express = require('express');
const User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/register', (req,res,next) => {
  if(error) return next(error)
  res.render('usersRegister.ejs');
})

router.post('/register',(req,res,next) => {
 User.create(req.body,(error,user) => {
   if(error) return next(error)
   res.redirect('/users/login')
 })
})


module.exports = router;
