import React, { useState } from "react";

// styles
import Style from "./CsvConverter.module.css";

const CsvConverter = ({ jsonData }) => {
  const handleConvert = async () => {
    try {
      const response = await fetch("/api/csv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${jsonData.projectAcronym}.csv`);

      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error converting to CSV:", error);
    }
  };

  return (
    <div>
      <button className={Style.CsvConvertButton} onClick={handleConvert} >Konvertiraj u CSV</button>
    </div>
  );
};

export default CsvConverter;
