require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash')

const session = require('express-session')
const passport = require("passport")
const flashMiddleware = require('./config/flashmessage')

const app = express()
app.set('view engine', 'ejs')
app.set('views')

// Middlewares of some sort :)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
const db = mongoose.connection
db.on('err', err => console.log(err))
db.once('open', () => console.log('connected to mongoose'))

// Controllers
app.use(flash())
app.use('/', flashMiddleware.setFlash)

app.use('/', require('./routes/home'))
app.use('/', require('./routes/auth'))


const port = process.env.PORT || 3000
app.listen(port, () => console.log('server is running'))
