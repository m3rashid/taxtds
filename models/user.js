const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: String,
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });
userSchema.plugin(require('passport-local-mongoose'));
module.exports = new mongoose.model('User', userSchema);
