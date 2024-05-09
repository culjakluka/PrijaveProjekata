const fs = require("fs");
const PDFDocument = require("pdfkit");
const { fieldMapping } = require("../config/fieldMapping");

async function generateProjectInfoPDF(projectData) {
  try {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Add project info to the PDF
    for (const [key, value] of Object.entries(projectData)) {
      const fieldName = fieldMapping[key] || key;
      if (value && typeof value !== "object") {
        // Exclude fields with empty values and objects
        doc.text(`${fieldName}: ${value}`);
      } else if (Array.isArray(value) && value.length > 0) {
        // Handle arrays of objects
        doc.text(`${fieldName}:`);
        value.forEach((item) => {
          doc.text(JSON.stringify(item));
        });
      }
    }

    // Return the PDF document instance
    return doc;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

module.exports = {
  generateProjectInfoPDF,
};
