const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
        required: true
    },
    email: {
        type: String,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = new mongoose.model('Service', serviceSchema);