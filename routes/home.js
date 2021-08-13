const express = require('express')
const router = express.Router()
const User = require('../models/home')


router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.get('/search', async (req, res) => {
    const state = req.body.state
    const service = req.body.service
})

module.exports = router;