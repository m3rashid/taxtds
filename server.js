require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash')

const jwt = require('jsonwebtoken');

const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const flash = require('connect-flash');

const app = express();
app.locals._ = _;
app.set('view engine', 'ejs');
app.set('views');

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    name: 'taxtds',
    secret: process.env.SESSION_SECRET, 
    saveUninitialized: false,
    resave: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.failure = req.flash('failure');
    next();
}); 

// Connection to atlas
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taxtds.nhimu.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongoose is connected'))
    .catch(err => console.log(err));


// Connection to local DB
// mongoose.connect(`mongodb://localhost:27017/taxtds`, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Mongoose is connected'))
//     .catch(err => console.log(err));

app.use('/', require('./routes/home'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/forgotPassword'));

// Handline error (non-defined) routes
app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/views/error.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on: ${port}`));
