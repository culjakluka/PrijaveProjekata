const express = require("express");
const { generatePDF, downloadPDF } = require("../controllers/pdfController");

const router = express.Router();

router.get("/generatePdf", generatePDF);
router.get("/downloadPdf/:filepath", downloadPDF);

module.exports = router;
