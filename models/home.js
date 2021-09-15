const mongoose = require('mongoose')
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const advertisementSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    address: String,
    state: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: String,
    admin: {
        type: Boolean,
        default: 0
    },
    ads: [advertisementSchema]
})

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate());

module.exports.advertisemnt = new mongoose.model('Advertisement', advertisementSchema)
module.exports.user = new mongoose.model('User', userSchema)