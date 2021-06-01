var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

var articleSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,minlength:8},
    likes:Number,
    comments:[String],
    author:String,
    slug:{type:String,slug:"title"}

},{timestamps:true});

articleSchema.pre('save', function(next){
    let random = Math.floor(Math.random() * 10)
    let str = this.title.split(' ').join('-').concat(random);
    this.slug = str;
    next();
})

var Article = mongoose.model('Article',articleSchema);

module.exports = Article;



// title
// description
// likes
// commemnts []
// author
// slug