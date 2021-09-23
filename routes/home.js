const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const User = require('../models/user');
const Service = require('../models/service');

// Tesing mailer start
router.get('/m', (req, res) => {
    res.render('mailer/signup.ejs');
})
// Testing end

router.get('/', (req, res) => {
    let userServices = [];
    Service.find({}).sort({date: 1}).exec((err, docs) => {
        if(err) console.log(err);
        else{
            if(docs && docs.length>0){
                userServices = docs;
            }
            else console.log('no docs found');
        }
        res.render('index.ejs', {
            titleTop: 'Home | Tax TDS',
            user: req.user,
            services: userServices,
            failure: req.flash('failure'),
            success: req.flash('success')
        });
    });
});

router.get('/search', async (req, res) => {
    const state = req.query.state;
    const service = req.query.service;

    // Nothing is done here as of now
    console.log(state, service);
    res.render('index.ejs', {
        titleTop: 'Taxtds',
        user: req.user,
        success: req.flash('success'),
        failure: req.flash('failure')
    });
});

router.get('/details', (req, res) => {
    res.render('details.ejs', {
        titleTop: 'Taxtds',
        user: req.user,
        success: req.flash('success'),
        failure: req.flash('failure')
    })
})

module.exports = router;