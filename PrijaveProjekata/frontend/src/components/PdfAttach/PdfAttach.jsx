import React from "react";
import styles from "./PdfAttach.module.css"
import { useState } from "react";

const PdfAttach = ({ onFilesSelect }) => {
    const [file, setFile] = useState([]);

    const handleFileChange = (e) => {
      const selectedFiles = e.target.files[0]
      setFile(selectedFiles);
      onFilesSelect(selectedFiles)
    };

    return (
        <>
        <div className={styles.PdfAttachContainer}>
            <span>Attach a PDF</span>
            <input type="file" onChange={handleFileChange} multiple/>
            <button>Upload PDF</button>
        </div>
        </>
    )
}

export default PdfAttach