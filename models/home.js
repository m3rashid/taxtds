const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
module.exports = new mongoose.model('Detail', detailSchema)