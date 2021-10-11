const router = require('express').Router();
const bodyParser = require('body-parser');
const passport = require('passport');

// const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const User = require('../models/user')
const Service = require('../models/service')
const email = require('../config/nodemailer');
const upload = require('../config/multer')
const fs = require('fs');

passport.use((User.createStrategy()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/user', (req, res) => {
    if(req.user && req.isAuthenticated()){
        let userServices = [];
        Service.find({addedBy: mongoose.Types.ObjectId(req.user.id)}, (err, docs) => {
            if(err) console.log(err);
            else{
                if(docs && docs.length>0) userServices = docs;
                else req.flash('failure', 'You have not registered any services');
            }
            req.flash('success', 'Successfully logged in');
            return res.render('user.ejs', {
                titleTop: 'Profile',
                name: req.user.name,
                services: userServices
            });
        });
    }
    else{
        req.flash('failure', 'You are not authenticated, signup (create account) or login first');
        return res.redirect('/');
    }
});

router.post('/user/add-service', upload.fields([
    { name: 'avatar', maxCount: 1 }, 
    { name: 'galleryImg1', maxCount: 1 }, 
    { name: 'galleryImg2', maxCount: 1 }, 
    { name: 'galleryImg3', maxCount: 1 }
]), (req, res) => {
    if(!req.isAuthenticated()){
        req.flash('flash', 'You are not authenticated to add service, signup (create account) or login first!');
        return res.redirect('/');
    }
    else{
        const userListedServices = req.body.userListedServices;
        let servicesSanitized = [];
        for(let i=0; i<userListedServices.length; i++){
            if(userListedServices[i] != null) servicesSanitized.push(userListedServices[i]);
        }
        const professions = req.body.professions;
        let sanitizedProfessions = [];
        for(let i=0; i<professions.length; i++){
            if(professions[i] != null && professions[i] != '') sanitizedProfessions.push(professions[i]);
        }
        const gallery = [req.files['galleryImg1'][0], req.files['galleryImg2'][0], req.files['galleryImg3'][0]]
        const avatar = req.files['avatar'][0];
        
        let imgArray = gallery.map((file) => {
            return encode_image = fs.readFileSync(file.path).toString('base64'); 
        });
        let avt = fs.readFileSync(avatar.path).toString('base64');

        const images = imgArray.map((src, index) => {
            return img = {
                filename: gallery[index].originalname, 
                contentType: gallery[index].mimetype, 
                img: src 
            } 
        });
        const avtImg = {
            filename: avatar.originalname, 
            contentType: avatar.mimetype, 
            img: avt 
        }
        
        const service = new Service({
            brandName: req.body.brandName,
            tagline: req.body.tagline,
            avatar: avtImg,
            gallery: images,
            owner: req.body.owner,
            experience: req.body.experience,
            establishment: req.body.establishment,
            addedBy: req.user.id,
            phone: req.body.phone,
            email: req.body.email,
            professions: sanitizedProfessions,
            address: req.body.address,
            state: req.body.state,
            services: servicesSanitized
        });
        
        service.save((err, doc) => {
            if(err){
                console.log(err);
                req.flash('failure', 'There was an error in registering your service, try again');
                req.flash('failure', 'error: ' + err.message);
            }
            else req.flash('success', 'Your service has been successfully registered in tax TDS');
            res.redirect('/user');
        });
    }
})

router.get('/service/edit/:serviceId', (req, res) => {
    if(!req.isAuthenticated()){
        req.flash('flash', 'You are not authenticated to add service, signup (create account) or login first!');
        return res.redirect('/');
    }
    else{
        Service.findById(req.params.serviceId, (err, doc) => {
            if(err) console.log(err);
            else{
                if(doc){
                    res.render('partials/edit-service.ejs', {
                        titleTop: 'Edit Service Details',
                        name: req.user.name,
                        services: doc
                    });
                }
                else{
                    req.flash('failure', 'Service not found');
                    res.redirect('back');
                }
            }
        });
    }
})

router.post('/service/edit/:serviceId', (req, res) => {
    if(!req.isAuthenticated()){
        req.flash('flash', 'You are not authenticated to add service, signup (create account) or login first!');
        return res.redirect('/');
    }
    else{
        const userListedServices = req.body.userListedServices;
        let servicesSanitized = [];
        for(let i=0; i<userListedServices.length; i++){
            if(userListedServices[i] != null) servicesSanitized.push(userListedServices[i]);
        }
        const professions = req.body.professions;
        let sanitizedProfessions = [];
        for(let i=0; i<professions.length; i++){
            if(professions[i] != null && professions[i] != '') sanitizedProfessions.push(professions[i]);
        }

        const updates = {
            brandName: req.body.brandName,
            tagline: req.body.tagline,
            owner: req.body.owner,
            experience: req.body.experience,
            establishment: req.body.establishment,
            addedBy: req.user.id,
            phone: req.body.phone,
            email: req.body.email,
            professions: sanitizedProfessions,
            services: servicesSanitized,
            address: req.body.address,
            state: req.body.state
        };
        console.log(updates);
        Service.findByIdAndUpdate(req.params.serviceId, updates, (err, docs) => {
            if(err){
                req.flash('failure', 'There was a problem in updating your service. Please try again');
                console.log(err);
            }
            else{
                req.flash('success', 'Successfully updated your service')
            }
        })
        res.redirect('/user')
    }

})









router.get('/user/delete-service/:serviceId', (req, res) => {
    if(!req.isAuthenticated()){
        req.flash('flash', 'You are not authenticated to add service, signup (create account) or login first!');
        return res.redirect('/');
    }
    else{
        Service.findById(req.params.serviceId, (err, service) => {
            if(err) console.log(err);
            else{
                User.findById(service.addedBy, (err,user) => {
                    if(err) console.log(err);
                    else{
                        email(user, 'deleteServiceByUser.ejs', 'You deleted one of your service(s)');
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
    }
})










router.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    passport.authenticate('local', { failureRedirect: '/' })(req, res, (err) => {
        if(err){
           console.log(err);
           req.flash('failure', 'An error occured');
           return res.redirect('/');
        }
        else{
            req.login(user, (error) => {
                if(error){
                    console.log(error);
                    req.flash('failure', 'An error occured');
                    return res.redirect('/');
                }
                else{
                    req.flash('success', 'Successfully logged in to your account')
                    res.redirect('/user');
                }
            })
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
                User.register({username: req.body.username, name: req.body.name}, req.body.password, (err, user) => {
                    if(err){
                        console.log(err);
                        return res.redirect('back');
                    }
                    else{
                        passport.authenticate('local')(req, res, () => {
                            req.flash('success', 'Successfully created your account on tax TDS');
                            email(user, 'signup.ejs', 'You have successfully created your account in Tax TDS');
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
