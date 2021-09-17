require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();
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


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('err', err => console.log(err));
db.once('open', () => console.log('connected to mongoose'));

app.use('/', require('./routes/home'));
app.use('/', require('./routes/auth'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on: ${port}`));
