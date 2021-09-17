const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/user')

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Dummy data
let user;
if(user !== null) user = 'User';

const advert = [
    { brandname: 'Dummy', owner: 'Dummy', address: 'wahi paan dukaan ke bagal wali gali seright', state: 'Nahi bataunga', service: 'Nahi bataunga', phone: '0123456789', email: 'thisisshit001@username.com' },

    { brandname: 'Dummy', owner: 'Dummy', address: 'wahi paan dukaan ke bagal wali gali seright', state: 'Nahi bataunga', service: 'Nahi bataunga', phone: '0123456789', email: 'thisisshit001@username.com' },
    
    { brandname: 'Dummy', owner: 'Dummy', address: 'wahi paan dukaan ke bagal wali gali seright', state: 'Nahi bataunga', service: 'Nahi bataunga', phone: '0123456789', email: 'thisisshit001@username.com' },
    
    { brandname: 'Dummy', owner: 'Dummy', address: 'wahi paan dukaan ke bagal wali gali seright', state: 'Nahi bataunga', service: 'Nahi bataunga', phone: '0123456789', email: 'thisisshit001@username.com' },
    
    { brandname: 'Dummy', owner: 'Dummy', address: 'wahi paan dukaan ke bagal wali gali seright', state: 'Nahi bataunga', service: 'Nahi bataunga', phone: '0123456789', email: 'thisisshit001@username.com' },
    
    { brandname: 'Dummy', owner: 'Dummy', address: 'wahi paan dukaan ke bagal wali gali seright', state: 'Nahi bataunga', service: 'Nahi bataunga', phone: '0123456789', email: 'thisisshit001@username.com' }
];

router.get('/user', (req, res) => {
    if(req.isAuthenticated()){
        res.render('user.ejs', {
            titleTop: 'User',
            username: user,
            advertisements: advert
        });
    }
    else{
        console.log('User is not authenticated');
        res.redirect('/')
    }
    
});

router.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, err => {
        if(err){
            console.log(err);
            console.log('No users were found with those credentials');
            return res.redirect('/');
        }
        else{
            passport.authenticate('local')(req, res, () => {
                return res.redirect('/user');
            })
        }
    })

    // if authenticated direct to /user/username
    // else back to home page (same with signup)
    
});

router.post('/signup', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        else if(foundUser){
            console.log('There is already a user with the same id, use some other');
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
                            res.redirect('/user');
                        });
                    }
                });
            }
            else{
                console.log('Passwords did not match');
            }
            
        }
    })

    
});

router.get("/logout", (req, res) => {
    req.logout();
    return res.redirect('/');
});


module.exports = router;
