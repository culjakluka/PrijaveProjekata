const mongoose = require('mongoose');

const Schema = mongoose.Schema

const departmentSchema = new Schema({
    name: {             // ime zavoda
        type: String,
        required: true,
    },
    headName: {         // ime i prezime predstojnika zavoda
        type: String,
        required: true,
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;