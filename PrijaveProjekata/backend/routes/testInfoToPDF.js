const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/testInfoToPDFController");

// Route to generate and download PDF
router.post("/", pdfController.generatePDF);

module.exports = router;
