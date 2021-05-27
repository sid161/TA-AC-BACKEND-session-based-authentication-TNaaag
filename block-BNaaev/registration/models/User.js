
var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema

var userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    age:Number,
    phone:{type:Number,minlength:10,maxlength:10}
})

userSchema.pre('save',function(next){
    if(this.password && this.isModified('password')){
        bcrypt.hash(this.password,10,(error,hashed) => {
            if(error) return next(error);
            this.password = hashed;
            return next()
        })
    } else{
        next();
    }
})

var User = mongoose.model('User',userSchema);
module.exports = User;


// name
// email(unique)
// password
// age
// phone