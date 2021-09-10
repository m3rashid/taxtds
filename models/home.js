const mongoose = require('mongoose')
const advertisementSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: 0
    },
    ads: [advertisementSchema]
})

module.exports.advertisemnt = new mongoose.model('Advertisement', advertisementSchema)
module.exports.user = new mongoose.model('User', userSchema)