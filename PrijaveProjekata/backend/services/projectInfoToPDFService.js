const PDFDocument = require("pdfkit");
const { fieldMapping } = require("../config/fieldMapping");
const ProjectInfoFlattener = require("../services/projectInfoFlattener");

async function generateProjectInfoPDF(projectData) {
  try {
    // Create a new PDF document
    const doc = new PDFDocument();
    const flattenedData = ProjectInfoFlattener.flattenProjectInfo(projectData);

    doc.registerFont("Cardo", "fonts/Cardo/Cardo-Regular.ttf");

    doc.font("Cardo").fontSize(12);

    // Add project info to the PDF
    for (const [key, value] of Object.entries(flattenedData)) {
      const fieldName = fieldMapping[key] || key;
      if (value && typeof value !== "object") {
        // Exclude fields with empty values and objects
        doc.font("Cardo").fontSize(12).text(`${fieldName}: ${value}`);
      } else if (Array.isArray(value) && value.length > 0) {
        // Handle arrays of objects
        doc.font("Cardo").fontSize(12).text(`${fieldName}: `);
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
