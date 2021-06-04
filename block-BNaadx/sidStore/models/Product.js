var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var productSchema = new Schema({
    name:{type:String,required:true},
    quantity:Number,
    price:Number,
    adminId:{type:Schema.Types.ObjectId,ref:"User"},
    likes:{type:Number, default:0}
},{timestamps:true})

var Product = mongoose.model('Product',productSchema);
module.exports = Product;








// name of product
// quantity of product
// price of product
// image (optional)
// likes