const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memorySchema = new Schema({
    text: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Memory', memorySchema);
