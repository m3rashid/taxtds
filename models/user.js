const mongoose = require('mongoose');

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
    name: {
        type: String,
        default: null
    },
    ads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advertisement'
    }]
});
userSchema.plugin(require('passport-local-mongoose'));

module.exports = new mongoose.model('User', userSchema);