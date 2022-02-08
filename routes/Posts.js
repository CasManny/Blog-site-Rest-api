const express = require("express");
const router = express.Router();
const User = require("../models/Users.js");
const Post = require("../models/Posts");
const bcrypt = require("bcrypt");




// Get all posts

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({status: 'success', data: posts})
  } catch (error) {
    res.status(500).json(error)
  }
})

// sort api by using query parameters

router.get('/', async ( req, res ) => {
  const { user, cat} = req.query
  console.log(req.query)
  // let results = []
  let posts;
  try {
    if(user) {
      posts = await Post.find({username: user})
    } else {
      res.status(404).json(`No post with username: ${user}`)
    }
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post("/", async (req, res) => {

    try {
        const savedPost = await Post.create(req.body)
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
});

// delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if(post.username === req.body.username) {
      try {
        await post.deleteOne({username: req.body.username})
        res.status(200).json("post has been Deleted")
      } catch (error) {
        res.status(401).json("you can only delete your post")
      }
    }
  } catch (error) {
    res.status(404).json('No post found')
  }
})

// get post

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

// update post 

router.put('/:id', async(req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if(post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, {
          $set: req.body
        }, {new: true})

        res.status(200).json(updatePost)
      } catch (error) {
        
      }
    } else {
      res.status(201).json("you can update only your post")
    }
  
  } catch (error) {
    res.status(500).json(error)
  }
  
})




module.exports = router;
