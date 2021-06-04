var express = require('express');
var mongoose = require('mongoose');
var Product = require('./Product');
var User = require('./User');

var Schema = mongoose.Schema

var cartSchema = new Schema({
    productId : [{type: Schema.Types.ObjectId, ref:'Product'}],

    authorId: [{type:Schema.Types.ObjectId,ref: "User"}]
},{timestamps:true})

var Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart;