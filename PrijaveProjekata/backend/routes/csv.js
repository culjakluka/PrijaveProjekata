const express = require("express");

const { convertToCSV } = require("../controllers/csvController");

const router = express.Router();

// POST csv
router.post("/", convertToCSV);

module.exports = router;
