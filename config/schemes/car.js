const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        en: {
            type: String,
            required: true
        },
        ru: {
            type: String,
            required: true
        }
    },
    description: {
        en: {
            type: String,
            required: true
        },
        ru: {
            type: String,
            required: true
        }
    },
    pictureUrl: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['car', 'suv', 'truck', 'upcoming'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    }
});


const Car = mongoose.model('Car', carSchema);

module.exports = {Car};