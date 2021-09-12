const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const passport = require('passport')
const passportLocalMongoose = require("passport-local-mongoose")
const session = require('express-session')

const homeModel = require('../models/home')
const User = homeModel.user

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

router.get("/user", (req, res) => {
    if(req.isAuthenticated()) res.render("/user")
    else res.redirect("/login")
})

router.post('/login', (req, res) => {
    const user = new User({
        username: req.body.email,
        password: req.body.password
    })
    req.login(user, err => {
        if(err) {
            console.log(err)
            req.flash('error', 'Error in loggin in. Check your credentials and try again')
            res.redirect('/login')
        }
        else {
            passport.authenticate("local")(req, res, () => {
                req.flash('success', 'Logged in successfully')
                res.redirect("/user")
            })
        }
    })
})

router.post('/signup', (req, res) => {
    User.register({username: req.body.email}, req.body.password, (err, user) => {
        if(err){
            console.log(err)
            req.flash('error', 'Error in signup')
            res.redirect("/signup")
        }
        else{
            Passport.authenticate("local")(req, res, () => {
                req.flash('success', 'Signed up successfully')
                res.redirect("/user")
            })
        }
    })
})

app.get("/logout", (req, res) => {
    req.logout()
    req.flash('success', 'Logged out successfully')
    res.redirect("/")
})

module.exports = router;
