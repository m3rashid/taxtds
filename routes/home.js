const express = require('express')
const router = express.Router()
const User = require('../models/home')


router.get('/', (req, res) => {
    res.render('index.ejs', {
        titleTop: 'taxtds'
    })
})

router.get('/search', async (req, res) => {
    const state = req.query.state
    const service = req.query.service

    console.log(state, service)
    res.render('index.ejs', {
        titleTop: 'taxtds'
    })
})

router.get('/details', (req, res) => {
    res.render('details.ejs', {
        titleTop: 'detail'
    })
})

module.exports = router;