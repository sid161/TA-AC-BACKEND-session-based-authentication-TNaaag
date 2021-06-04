var mongoose = require('mongoose');
var Product = require('./Product');
var User = require('./User');

var Schema = mongoose.Schema

var commentSchema = new Schema({
    content:{type:String,required:true},
    ProductId: {type:Schema.Types.ObjectId,ref:"Product",required:true},
    likes:{type:Number, default:0},
    author:String
},{timestamps:true});

var Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;