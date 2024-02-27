const express = require('express');
const pdfController = require('../controllers/pdfController');

const router = express.Router();

router.get('/generatePdf', pdfController.generatePDF);

module.exports = router;