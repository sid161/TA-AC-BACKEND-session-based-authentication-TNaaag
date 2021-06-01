var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
const User = require('../models/User');

router.get('/', (req, res, next) => {
    console.log(req.session.userId, 'from articles......');
    var session = req.session.userId;
    Article.find({}, (err, articles, next) => {
      console.log(err, articles, session);
      if (err) return next(err);
      User.findById(session, (err, user) => {
        if (err) return next(err);
        console.log(user, '000000000000000000000000000000000000000');
        res.render('articles', {
          articles: articles,
          session: session,
          user: user,
        });
      });
    });
  });

router.get('/new',(req,res) => {
    res.render('addArticle.ejs');
})

router.post('/',(req,res,next) => {
 Article.create(req.body,(err,article) => {
    if(err) return next(err)
    res.redirect('/articles');
    })
})

router.get("/:slug",(req,res,next) => {
    var session = req.session.userId;
    var slug = req.params.slug;
    Article.find({slug},(err,article) => {
        if(err) return next(err)
        res.render('singleArticle', {article:article[0], session:session})
    })
})

router.get('/:id/edit',(req,res,next) => {
    var id = req.params.id;
    Article.findById(id,(err,article) => {
        if(err) return next(err);
        res.render('updateArticle.ejs');
    })
})

router.post("/:id/edit", (Req,res,next) => {
    var id = req.params.id;
    Article.findByIdAndUpdate(id,req.body,(err,updatedArticle) => {
        if(err) return next(err)
        res.redirect('/articles/' + id);
    })
})

router.get("/:id/delete",(req,res,next) => {
    var id = req.params.id;
    Article.findByIdAndDelete(id,(err) =>{
        Comment.deleteMany({articleId:id},(err,info) => {
            if(err) next(err)
            res.redirect('/articles');
        })
    })
})

router.get('/:slug/likes',(req,res,next) => {
    var slug = req.params.slug;
    Article.findByIdAndUpdate(slug, {$inc: {likes:1}}, (err,article) => {
        if(err) return next(err)
        res.redirect('/articles/' + slug);
    })
})

router.get('/:slug/dislikes',(req,res,next) => {
    var slug = req.params.slug;
    Article.findByIdAndUpdate(slug, {$inc: {likes:-1}}, (err,article) => {
        if(err) return next(err)
        res.redirect('/articles/' + slug);
    })
})

router.post('/:id/comments',(req,res) => {
    var articleId = req.params.articleId;
    req.body.articleId = articleId;
    Comment.create(req.body,(err,comment) => {
        if(err) return next(err)
        Article.findByIdAndUpdate(articleId,{$push: {$commentId:$commentId}})
        res.redirect('/articles/' + article.slug);
    })

})




module.exports = router;