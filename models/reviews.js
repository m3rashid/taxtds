const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
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
});

module.exports = new mongoose.model('Review', reviewsSchema);