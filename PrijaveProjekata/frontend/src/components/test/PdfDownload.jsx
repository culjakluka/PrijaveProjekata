import react from "react";
import styles from "./PdfDownload.module.css";

const PdfDownload = ({ filename, filepath }) => {
  const handleDownload = async () => {
    try {
      console.log(filename);
      console.log(filepath);
      const response = await fetch(`/api/pdf/downloadPdf/${filepath}`);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([blob]));
      link.download = filename;
      link.click();
    } catch (error) {
      console.log("Error downloading pdf: " + error);
    }
  };
  return (
    <div classname={styles.pdfDownloadContainer}>
      <h1>PDF Download</h1>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default PdfDownload;
