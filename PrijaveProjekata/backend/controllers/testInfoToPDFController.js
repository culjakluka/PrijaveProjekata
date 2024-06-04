const {
  generateProjectInfoPDF,
} = require("../services/projectInfoToPDFService");

async function generatePDF(req, res) {
  try {
    const { projectData } = req.body;

    // Generate the PDF document
    const doc = await generateProjectInfoPDF(projectData);

    // Pipe the PDF content to the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=project_info.pdf"
    );
    doc.pipe(res);

    // End the response
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
}

module.exports = {
  generatePDF,
};
