const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

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

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password 
    User.find({email: email}, (user, err) => {
        if(!err){
            if(user){
                if(user.password == password){
                    // Login the user
                }
            }
            else res.send(`No users found with the given credentials`)
        }
        else res.send(`An error occured: \n${err}\n`)
    })
})

router.post('/signup', (req, res) => {
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password

    res.redirect('/')
    const user = new User({ email, phone, password })
    user.save(err => {
        if(err) {
            res.status(404).json({error: 'Something unusual occured, cant save your credentials, try again'})
        }
    })

    
})

module.exports = router;