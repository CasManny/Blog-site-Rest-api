const express = require('express')
const router = express.Router()
const User = require('../models/Users.js')
const bcrypt = require('bcrypt')


router.post('/register', async (req, res) => {
    try {
        const salt =  await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        })
        res.status(201).json({status: 'success', data:[user]})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        const validateUser = await bcrypt.compare(req.body.password, user.password)
        console.log(user, 123)

        if(!validateUser) {
            return res.status(404).json({
              msg: "password do not match! Try again...",
              status: "success",
              data: { users: {} },
            });
        }

        if(!user) {
            return res.status(404).json({
              msg: "User not found! Try again...",
              status: "success",
              data: { users: {} },
            });
            
           
        }
        const { password, ...others} = user._doc

        res.status(200).json({status: 'success', data: {users: [others]}})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})


module.exports = router