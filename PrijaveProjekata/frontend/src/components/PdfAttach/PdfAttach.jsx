import React from "react";
import styles from "./PdfAttach.module.css"
import { useState } from "react";

const PdfAttach = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleFileUpload = async () => {
      const formData = new FormData();
      formData.append('pdfFile', file);
  
    try {
        // Replace 'your-api-endpoint' with the actual endpoint in your backend
        const response = await fetch('your-api-endpoint', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('Error uploading file');
        }
      } catch (error) {
        console.error('Error uploading file', error);
      }
    };

    return (
        <>
        <div className={styles.PdfAttachContainer}>
            <span>Attach a PDF</span>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload PDF</button>
        </div>
        </>
    )
}

export default PdfAttach