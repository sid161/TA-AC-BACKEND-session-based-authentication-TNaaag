var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Product = require('./Product');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true},
    password:{type:String,minlength:5},
    isAdmin:{type:Boolean,default:false},
    //  productId: [{type:Schema.Types.ObjectId,ref:'Product'}]
},{timestamps:true})

userSchema.pre('save',function(next){
    if(this.password && this.isModified('password')){
        bcrypt.hash(this.password,(err,hashed) => {
            if(err) return next(err)
            this.password = hashed;
            return next()
        })
    } else{
        next();
    }
})

userSchema.methods.verifyPassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,result) => {
        return cb(err,result);
    })
}






var User = mongoose.model('User',userSchema);
module.exports = User;