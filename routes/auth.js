const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/user')
const Service = require('../models/service')

const signupMailer = require('../mailer/signup');

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
            services: advert
        });
    }
    else{
        console.log('User is not authenticated');
        res.redirect('/')
    }
    
});

router.post('/user/add-service', (req, res) => {
    if(!req.isAuthenticated()){
        return res.redirect('/');
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
            if(err) console.log(err);
            else console.log(doc);
            res.redirect('back');
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
            console.log('No users were found with those credentials');
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
