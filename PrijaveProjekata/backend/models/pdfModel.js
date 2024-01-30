const mongoose = require('mongoose');

const Schema = mongoose.Schema

const pdfSchema = new Schema({
    filename: String,
    filepath: String,
});

const Pdf = mongoose.model('Pdf', pdfSchema);

module.exports = Pdf;