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
    experience: {
        type: String,
        required: true
    },
    establishment: {
        type: String,
        required: true
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
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        comment: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });


module.exports = new mongoose.model('Service', serviceSchema);