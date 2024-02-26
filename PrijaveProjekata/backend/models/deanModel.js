const mongoose = require('mongoose');

const Schema = mongoose.Schema

const deanSchema = new Schema({
    name: {         // ime i prezime dekana
        type: String,
        required: true,
    },
    email: {        // email dekana
        type: String,
        required: true,
    }
});

const Dean = mongoose.model('Dean', deanSchema);

module.exports = Dean;