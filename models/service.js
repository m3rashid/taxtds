const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    tagline: String,
    owner: {
        type: String,
        required: true
    },
    establishment: {
        type: Date,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    services: [{
        type: String
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});


module.exports = new mongoose.model('Service', serviceSchema);