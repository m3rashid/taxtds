require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash')

const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const flash = require('connect-flash');

const app = express();
app.locals._ = _;
app.set('view engine', 'ejs');
app.set('views');

app.use(express.static('public'));
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

// Connection to atlas
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taxtds.nhimu.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

// Connection to local DB
// mongoose.connect(`mongodb://localhost:27017/taxtds`, { useNewUrlParser: true, useUnifiedTopology: true });


// const db = mongoose.connection;
// db.on('err', err => console.log(err));
// db.once('open', () => console.log('connected to mongoose'));


app.use('/', require('./routes/home'));
app.use('/', require('./routes/auth'));

// Handline error (non-defined) routes
app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/views/error.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on: ${port}`));
