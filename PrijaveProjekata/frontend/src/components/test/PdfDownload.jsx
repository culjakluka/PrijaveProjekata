import react, { useState } from "react";
import styles from "./PdfDownload.module.css";

// external components
// FontAwesome 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const PdfDownload = ({ filename, filepath }) => {

  const[fullFilename, setFullFilename] = useState(filename);

  const handleDownload = async () => {
    try {
      console.log("filename: " + filename);
      console.log(filepath);
      const response = await fetch(`/api/pdf/downloadPdf/${filename}`);
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
    <div className={styles.pdfDownloadContainer}>
      <p className={styles.pdfDocumentTitle}>{filename.substring(0,15)+"..."}</p>
      <button onClick={handleDownload} className={styles.downloadButton}>
        <div className={styles.downloadButtonText}>PREUZMI</div>
        <FontAwesomeIcon icon={faDownload} style={{color: "#ffffff"}}/>
      </button>
    </div>
  );
};

export default PdfDownload;
