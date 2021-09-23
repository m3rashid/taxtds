const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const User = require('../models/user')
const Service = require('../models/service')
const signupMailer = require('../mailer/signup');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/admin', (req, res) => {
    res.render('admin.ejs', {
        titleTop: 'Tax TDS | Admin',
        success: req.flash('success'),
        failure: req.flash('failure')
    })
})

router.get('/user', (req, res) => {
    if(req.isAuthenticated()){
        let userServices = [];
        Service.find({addedBy: mongoose.Types.ObjectId(req.user.id)}, (err, docs) => {
            if(err) console.log(err);
            else{
                if(docs && docs.length>0) userServices = docs;
                else req.flash('failure', 'You have not registered any services');
            }
            req.flash('success', 'Successfully logged in');
            res.render('user.ejs', {
                titleTop: 'Profile',
                username: req.user.username,
                services: userServices,
                success: req.flash('success'),
                failure: req.flash('failure')
            });
        });
    }
    else{
        req.flash('failure', 'You are not authenticated, signup (create account) or login first');
        res.redirect('/');
    }
});


router.post('/user/add-service', (req, res) => {
    if(!req.isAuthenticated()){
        req.flash('flash', 'You are not authenticated to add service, signup (create account) or login first!')
        res.redirect('/');
    }
    else{
        const service = new Service ({
            brandName: req.body.brandName,
            owner: req.body.owner,
            address: req.body.address,
            state: req.body.state,
            service: req.body.service,
            phone: req.body.phone,
            email: req.body.email,
            addedBy: req.user.id
        });
        service.save((err, doc) => {
            if(err) req.flash('failure', 'There was an error in registering your service, try again');
            else {
                req.flash('success', 'Your service has been successfully registered in tax TDS');
            }
            res.redirect('/user');
        });
    }
})

router.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, err => {
        if(err){
            console.log(err);
            req.flash('failure', 'No user found, check your username/password and try again')
            return res.redirect('/');
        }
        else{
            passport.authenticate('local')(req, res, () => {
                // signupMailer();
                return res.redirect('/user');
            });
        }
    });
});

router.post('/signup', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if(err){
            console.log(err);
            req.flash('failure', 'There was a problem in creating account, please try again');
            return res.redirect('/');
        }
        else if(foundUser){
            req.flash('failure', 'There is already a user with the same id, login or signup with a different email');
            return res.redirect('/');
        }
        else{
            if(req.body.password == req.body.confirm_password){
                User.register({username: req.body.username}, req.body.password, (err, user) => {
                    if(err){
                        console.log(err);
                        res.redirect('back');
                    }
                    else{
                        passport.authenticate('local')(req, res, () => {
                            req.flash('success', 'Successfully created your account on tax TDS');
                            res.redirect('/user');
                        });
                    }
                });
            }
            else{
                req.flash('failure', 'Passwords did not match, try again');
                res.redirect('/');
            }      
        }
    })    
});


router.get("/logout", (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out')
    return res.redirect('/');
});


module.exports = router;
