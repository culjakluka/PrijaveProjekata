const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const firstDataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('FirstData', firstDataSchema)
