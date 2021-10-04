const router = require('express').Router();
const _ = require('lodash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const User = require('../models/user');
const Service = require('../models/service');
const email = require('../config/nodemailer');

// Tesing mailer
router.get('/mail', (req, res) => {
    res.render('mailer/deleteServiceByUser.ejs', {data: req.user, link: 'www.google.com'});
})

// TODO make this work
router.get('/admin/advertise-service/:serviceId', (req, res) => {
    res.send('<h1>Under Construction</h1>')
})


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
        User.find({}, (err, docs) => {
            if(err) console.log(err);
            else{
                if(docs) allUsers = docs;
                else{
                    allusers = [];
                    req.flash('failure', 'No registered users found');
                }
            }
        });
        Service.find({}, (err, docs) => {
            if(err) console.log(err);
            else{
                if(docs) services = docs;
                else{
                    services = [];
                    req.flash('failure', 'No registered services found');
                }
            }
        })    

        req.flash('success', 'successfully logged in as admin');
        res.render('admin.ejs', {
            titleTop: 'Tax TDS | Admin',
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
    //* First send mail to the user that it is about to be deleted
    User.findById(req.params.userId, (err, user) => {
        if(err){
            console.log(err);
            req.flash('failure', 'An error occured');
        }
        else if(!user){
            req.flash('failure', 'No users found');
        }
        else{
            // TODO Make a mailer template for deleting the user
        }
    })

    //! Do the delete operation
    Service.deleteMany({addedBy: req.params.userId}, (err, doc) => {
        if(err){
            console.log(err);
            req.flash('failure', 'A problem occured. Cannot delete services of this user');
        }
        else req.flash('success', 'Deleted all services of this user');
    });
    User.deleteOne({id: req.params.userId}, (err, doc) => {
        if (err){
            console.log(err);
            req.flash('failure', 'A problem occured. Cannot delete user, try again');
        }
        else req.flash('success', 'Successfully deleted user');
        res.redirect('/admin');
    })
})

router.get('/admin/delete-service/:serviceId', (req, res) => {
    //* send mail to the user that its service is deleted
    Service.findById(req.params.serviceId, (err, service) => {
        if(err) console.log(err);
        else{
            User.findById(service.addedBy, (err,user) => {
                if(err) console.log(err);
                else{
                    // TODO make a service-delete mailer template to be sent to the user
                    req.flash('success', 'Service delete mail sent to the user');
                }
            })
        }
    })

    //! do the delete operation
    Service.deleteOne({id: req.params.serviceId}, (err, doc) => {
        if (err){
            console.log(err);
            req.flash('failure', 'A problem occured. Cannot delete service, try again');
        }
        else req.flash('success', 'Successfully deleted the service');
        res.redirect('back');
    })
})

router.post('/service/write-review/:serviceId', (req, res) => {
    const review = {
        name: req.body.name,
        rating: req.body.rating,
        comment: req.body.comment
    };
    Service.findByIdAndUpdate(req.params.serviceId, {'$push': {reviews: review}}, (err, docs) => {
        if(err){
            console.log(err);
            req.flash('failure', 'Error in posting review');
        }
        else req.flash('success', 'Successfully posted the review');
    });
    res.redirect('back');
});

router.get('/service/details/:serviceId', (req, res) => {
    Service.findById(req.params.serviceId, (err, docs) => {
        if(err) console.log(err);
        else{
            if(docs){
                res.render('details.ejs', {
                    titleTop: 'User Details',
                    services: docs,
                });
            }
            else{
                req.flash('failure', 'Service not found');
                res.redirect('back');
            }
        }
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
            admin: getAdmin()
            // failure: req.flash('failure'),
            // success: req.flash('success'),
        });
    });
});

// Searching (title bar state/service search)
router.get('/search', async (req, res) => {
    const state = req.query.state;
    const service = req.query.service;
    // Nothing is done here as of now
    res.render('index.ejs', {
        titleTop: 'Taxtds',
        user: req.user
        // success: req.flash('success'),
        // failure: req.flash('failure')
    });
});

// Searching (left panel category search)
router.get('/services/category/:list', (req, res) => {
    const list = req.params.list;
    console.log(_.lowerCase(list));
    // Nothing as of now
    res.redirect('/');
})

module.exports = router;
