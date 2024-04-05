const PDFDocument = require("pdfkit");
const fs = require("fs");

const generatePDF = (req, res) => {
  const pdfDoc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="projekat.pdf"');
  pdfDoc.pipe(res);

  //pdfDoc.text('Hello World');

  pdfDoc.end();
};

const downloadPDF = async (req, res) => {
  console.log("Downloading PDF");
  const { filepath } = req.params;
  try {
    const filePath = `./uploads/${filepath}`; //makni hardcode

    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      return res.status(404).json({ error: "File not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filepath}` //makni hardcode
    );

    const fileStream = fs.createReadStream(filePath);
    fileStream.on("error", (error) => {
      console.error("Error streaming file:", error);
      res.status(500).json({ error: "Error streaming file" });
    });
    fileStream.on("end", () => {
      console.log("File stream ended");
    });
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  generatePDF,
  downloadPDF,
};
