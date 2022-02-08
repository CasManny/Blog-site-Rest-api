const express = require("express");
const router = express.Router();
const User = require("../models/Users.js");
const Post = require('../models/Posts')
const bcrypt = require('bcrypt')

// update user
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)
        }

        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})

            res.status(200).json(updateUser)
          
        } catch (error) {
          res.status(500).json({ msg: error });
        }
    } else {
        res.status(401).json('you can update only your account')
    }
});


// delete user including their posts
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {

       try {
           const user = await User.findById(req.params.id)
           
           try {
               await Post.deleteMany({username: user.username})
               await User.findByIdAndDelete(req.params.id)
               const remainingUsers = await User.find({})
               res.status(200).json({msg: 'User have been deleted', data: {users: remainingUsers}})
    
             
           } catch (error) {
             res.status(500).json({ msg: error });
           }
       } catch (error) {
           res.status(404).json("user not found")
       }

    } else {
        res.status(401).json('you can delete only your account')
    }
});


// get user info and data

router.get('/:id', async (req, res) => {
    try {
       const user = await User.findById(req.params.id)
       const posts = await Post.findOne({username: user.username})
       const {password, ...otherData} = user._doc
       res.status(200).json({status: 'success', data:{ "userInfo": otherData, "userPosts": posts}}) 
    } catch (error) {
        res.status(200).json('User not found')
    }
})



module.exports = router;
