import React from "react";
import styles from "./PdfAttach.module.css";
import { useState } from "react";

const PdfAttach = ({ onFilesSelect, setMissingHeadOfDepartmentStatement, handlesHeadOfDepartmentStatement }) => {
  const [file, setFile] = useState([]);

  const handleFileChange = (event) => {
    if(handlesHeadOfDepartmentStatement && event.target.files.length > 0) {
      setMissingHeadOfDepartmentStatement(false);
    }
      
    const selectedFiles = Array.from(event.target.files);
    setFile(selectedFiles);
    onFilesSelect(selectedFiles);
    console.log(file);
  };

  return (
    <>
      <div className={styles.PdfAttachContainer}>
        <span>Priložite PDF</span>
        <form encType="multipart/form-data" name="pdfDocuments">
          <input type="file" onChange={handleFileChange} multiple />
        </form>
      </div>
    </>
  );
};

export default PdfAttach;
