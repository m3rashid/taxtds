require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs')
app.set('views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
const db = mongoose.connection
db.on('err', err => console.log(err))
db.once('open', () => console.log('connected to mongoose'))

// Routing
app.use('/', require('./routes/home'))


const port = process.env.PORT || 3000
app.listen(port, () => console.log('server is running'))