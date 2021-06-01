var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
const User = require('../models/User');
var Comment = require('../models/Comment');

router.get("/:commentId/edit",(req,res,next) => {
    var commentId = req.params.commentId;
    Comment.findById(commentId,(err,comment) => {
        if(err) return next(err)
        res.render('EditComment.ejs');
    })
})

router.post("/:id",(req,res,next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id,req.body,(err,updatedComment) => {
        if(err) return next(err)
        res.redirect('/articles/' + comment.articleId);
    })
})

router.get('/:id/delete', (req,res,next) => {
    var id = req.params.id;
    Comment.findByIdAndDelete(id,(err,comment) => {
        if(err) return next(err)
        res.redirect('/articles/' + comment.articleId);
    })
})

router.get('/:id/likes',(req,res,next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id,{$inc: {likes:1}},(err,updatedComment) => {
        res.redirect('/articles/' + updatedComment.articleId)
    })
})

router.get('/:id/dislike',(req,res,next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id,{$inc: {likes: -1}},(err,updatedComment) => {
        if(err) return next(err)
        res.redirect('/articles/' + updatedComment.articleId);
    })
})

module.exports = router;