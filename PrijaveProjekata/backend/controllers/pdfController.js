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

const convertToPdf = async (filePath, fileType) => {
  return new Promise((resolve, reject) => {
    if (fileType === "image") {
      // Convert image to PDF
      const pdfBuffer = imageToPdf(fs.readFileSync(filePath));
      resolve(pdfBuffer);
    } else if (fileType === "document") {
      // Convert document (e.g., Word, HTML) to PDF
      // Implement your logic here
    } else {
      // Unsupported file type
      reject(new Error("Unsupported file type"));
    }
  });
};

const determineFileType = (filePath) => {
  const buffer = Buffer.alloc(8); // Read the first 8 bytes
  const fd = fs.openSync(filePath, "r");
  fs.readSync(fd, buffer, 0, 8, 0);
  fs.closeSync(fd);

  // Check magic numbers or signatures to determine file type
  if (buffer.slice(0, 4).toString("hex") === "25504446") {
    return "pdf";
  } else if (
    buffer.slice(0, 4).toString("hex") === "ffd8ffe0" ||
    buffer.slice(0, 4).toString("hex") === "ffd8ffe1"
  ) {
    return "image";
  } else {
    return "unknown"; // Default to 'unknown' if the file type cannot be determined
  }
};

const downloadPDF = async (req, res) => {
  try {
    const filePath = `.\\uploads\\${req.params.filepath}`;
    const fileType = determineFileType(filePath);
    const pdfBuffer = await convertToPdf(filePath, fileType);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=${req.params.filename}`
    );
    pdfDoc.pipe(res);

    res.send(pdfBuffer);
  } catch (error) {
    console.log("Error downloading pdf: " + error);
  }
};

module.exports = {
  generatePDF,
  downloadPDF,
};
