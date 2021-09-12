const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const passport = require('passport')
const passportLocalMongoose = require("passport-local-mongoose")
const session = require('express-session')

const homeModel = require('../models/home')
const User = homeModel.user
const Advertisement = homeModel.advertisemnt

router.get('/', (req, res) => {
    res.render('index.ejs', {
        titleTop: 'Taxtds'
    })
})

router.get('/search', async (req, res) => {
    const state = req.query.state
    const service = req.query.service

    // Nothing is done here as of now
    console.log(state, service)
    res.render('index.ejs', {
        titleTop: 'Taxtds'
    })
})

router.get('/details', (req, res) => {
    res.render('details.ejs', {
        titleTop: 'Taxtds'
    })
})

module.exports = router;