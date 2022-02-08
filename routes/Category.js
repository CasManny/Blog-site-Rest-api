const router = require('express').Router()
const Category = require('../models/Category')

router.post('/', async (req, res) => {
    
    try {
        const newCategory = await Category.create(req.body)
        res.status(200).json(newCategory)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router