const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');

router.get('/test',(req,res)=>{
  res.json({
    msg:"Posts works"
  });
});

router.post('/',passport.authenticate('jwt',{session: false}),(req, res)=>{
  const {errors,isValid} = validatePostInput(req.body);

  if(!isValid)
  {
    return res.status(400).json(errors);
  }
  
  const newPost = new Post({
    text:req.body.text,
    name:req.body.name,
    avatar:req.body.avatar,
    user:req.user.id
  });

  newPost.save()
  .then(post => res.json(post))
  .catch(err => console.log(err))
});

router.get('/',(req, res)=>{
  Post.find()
  .sort({date: -1})
  .then(posts => res.json(posts))
  .catch(err => res.json({nopostsfound:'No posts found'}))
});

router.get('/:id',(req, res)=>{
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.json({nopostfound:'No post found with that Id'}))
});

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req, res)=>{
  Profile.findOne({user:req.user.id})
  .then(profile =>{
    Post.findById(req.params.id)
    .then(post =>{
      if(post.user.toString() !== req.user.id)
      {
        return res.status(401).json({notauthorised:'User not authorised'})
      }

      post.remove()
      .then(()=>res.json({success:true}))
      .catch(err => res.status(404).json({postnotfound:'No post found'}))
    })
  })
});

router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req, res)=>{
  Profile.findOne({user:req.user.id})
  .then(profile =>{
    Post.findById(req.params.id)
    .then(post =>{
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0)
      {
        return res.status(400).json({alreadyliked:'User already liked this post'})
      }

      post.likes.unshift({user:req.user.id})

      post.save()
      .then(posts => res.json(posts))
      .catch(err => console.log(err))
    })
    .catch(err => res.status(404).json({postnotfound:'No post found'}))
  })
});


router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req, res)=>{
  Profile.findOne({user:req.user.id})
  .then(profile =>{
    Post.findById(req.params.id)
    .then(post =>{
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
      {
        return res.status(400).json({notliked:'You have not liked this post'})
      }

      const removeIndex = post.likes
      .map(item => item.user.toString())
      .indexOf(req.user.id);

      post.likes.splice(removeIndex,1);

      post.save()
      .then(post => res.json(post))
    })
    .catch(err => res.status(404).json({postnotfound:'No post found'}))
  })
});

router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Post.findById(req.params.id)
  .then(post => {
    const newComment = {
      text:req.body.text,
    }
  })
});

module.exports = router;
