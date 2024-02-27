const PDFDocument = require('pdfkit');

const generatePDF = (req, res) => {
    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="projekat.pdf"');
    pdfDoc.pipe(res);

    //pdfDoc.text('Hello World');

    pdfDoc.end();
};

module.exports = {
    generatePDF
};
