const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');

const User = require('../models/user');
const Service = require('../models/service');
const Review = require('../models/reviews')
const signupMailer = require('../mailer/signup');


// Tesing mailer start
router.get('/mail', (req, res) => {
    res.render('mailer/signup.ejs');
})
// Testing mailer end"



let sessions;
router.post('/adminLogin', (req, res) => {
    if(req.body.username == process.env.ADMIN_USERNAME && req.body.password == process.env.ADMIN_PASSWORD){
        sessions = req.session;
        sessions.userid = req.body.username;
        req.flash('success', 'Successfully authenticated as an admin of Tax TDS');
        res.redirect('/admin');
    }
    else{
        req.flash('failure', 'Admin username or Admin password wrong');
        res.redirect('/');
    }
});

let allUsers = []; 
let services = [];

router.get('/admin', (req, res) => {
    if(!sessions){
        req.flash('failure', 'session not set as admin');
        res.redirect('/');
    }
    else if(sessions.userid){
        User.find({admin : 0}, (err, docs) => {
            if(err) console.log(err);
            else{
                if(docs && docs.length>0) allUsers = docs;
                else{
                    allusers = [];
                    req.flash('failure', 'No registered users found');
                }
            }
        });
        Service.find({}, (err, docs) => {
            if(err) console.log(err);
            else{
                if(docs && docs.length>0) services = docs;
                else{
                    services = [];
                    req.flash('failure', 'No registered services found');
                }
            }
        })    

        req.flash('success', 'successfully logged in as admin');
        res.render('admin.ejs', {
            titleTop: 'Tax TDS | Admin',
            success: req.flash('success'),
            failure: req.flash('failure'),
            allUsers: allUsers,
            services: services
        });
    }
    else{
        req.flash('failure', 'An error occured, Admin not found');
        res.redirect('/');
    }
});

function getAdmin(){
    if(sessions == null || sessions == undefined) return false;
    else if(sessions.userid) return true;
    else return false;
}


router.get('/adminLogout', (req, res) => {
    sessions = undefined;
    req.flash('success', 'Successfully logged out of admin');
    res.redirect('/');
});


router.get('/admin/delete-user/:userId', (req, res) => {
    console.log(req.params.userId)
    Service.deleteMany({addedBy: req.params.userId}, (err, doc) => {
        if(err) req.flash('failure', 'A problem occured. Cannot delete services of this user');
        else{
            req.flash('success', 'Deleted all services of this user');
            console.log(doc);
        }
    });
    User.deleteOne({id: req.params.userId}, (err, doc) => {
        if (err){
            req.flash('failure', 'A problem occured. Cannot delete user, try again');
        }
        else{
            req.flash('success', 'Successfully deleted user');
            console.log(doc);
        }
        res.redirect('/admin');
    })
})

router.get('/admin/delete-service/:serviceId', (req, res) => {
    Service.deleteOne({id: req.params.serviceId}, (err, doc) => {
        if (err){
            req.flash('failure', 'A problem occured. Cannot delete service, try again');
        }
        else{
            req.flash('success', 'Successfully deleted the service');
            console.log(doc);
        }
        res.redirect('back');
    })
})

router.get('/admin/advertise-service/:serviceId', (req, res) => {
    res.send('<h1>Under Construction</h1>')
})

const dummyDataService = {
    brandName: 'This is the brandname',
    tagline: 'Awesome tagline of the awesome brand',
    owner: 'Babu rao',
    establishment: '1998',
    addedBy: 'Babu Rao',
    phone: '9988776655',
    email: 'mastaadmibaburaao@hotmail.com',
    profession: 'Ameer aadmi',
    address: 'Mumbai me chhota sa bhade par kholi hai, navi mumbai, Bihar',
    state: 'Bihar',
    services: ['tax filing', 'income tax', 'bhoot bhagao', 'purane aashiq se saamna', 'aur bhi hai', 'aao kabhi milne', 'chai pilaunga']
}
const dummyDataReviews = [
    { name: 'MD Rashid Hussain', comment: `This is a very positive review of this service's and this is good.`, rating: 1 },
    { name: 'MD Rashid Hussain', comment: `This is a very positive review of this service's and this is good.`, rating: 2 },
    { name: 'MD Rashid Hussain', comment: `This is a very positive review of this service's and this is good.`, rating: 3 },
    { name: 'MD Rashid Hussain', comment: `This is a very positive review of this service's and this is good.`, rating: 4 },
    { name: 'MD Rashid Hussain', comment: `This is a very positive review of this service's and this is good.`, rating: 5 },
]

router.get('/details', (req, res) => {
    res.render('details.ejs', {
        titleTop: 'User Details',
        // user: req.user,
        success: req.flash('success'),
        failure: req.flash('failure'),
        userListedservices: dummyDataService,
        userReviews: dummyDataReviews
    })
})

router.post('/service/write-review/:serviceId', (req, res) => {
    const serviceId = req.params.serviceId;
    const review = new Review({
        name: req.body.name,
        rating: req.body.rating,
        comment: req.body.comment
    });
});
















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
            success: req.flash('success'),
            admin: getAdmin()
        });
    });
});

router.get('/search', async (req, res) => {
    const state = req.query.state;
    const service = req.query.service;
    // Nothing is done here as of now
    res.render('index.ejs', {
        titleTop: 'Taxtds',
        user: req.user,
        success: req.flash('success'),
        failure: req.flash('failure')
    });
});

module.exports = router;
