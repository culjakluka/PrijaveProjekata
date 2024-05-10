const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");

// Route to generate and download PDF
router.post("/api/generate-pdf", pdfController.generatePDF);

module.exports = router;
