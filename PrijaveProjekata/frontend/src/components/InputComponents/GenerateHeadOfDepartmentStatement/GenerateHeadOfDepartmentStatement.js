import React, { useContext } from 'react';
import '../../../index.css'

// pdf
import { pdf } from "@react-pdf/renderer";

// custom pdf
import DepartmentHeadStatementPDF from '../PDF/DepartmentHeadStatementPDF';

//context
import { SecondInputFormDataContext } from '../../../context/SecondInputFormDataContext';

const GenerateHeadOfDepartmentStatement = () => {

    
    // using context
    const { nameSurname, department, projectTitle } = useContext(SecondInputFormDataContext);   

    // handle pdf new tab
        const handlePDF = () => {
        // Assuming pdf() is a function that returns a Promise resolving to a blob
        // Generate the document
        // split department to get only the name of the head of department
        const doc = <DepartmentHeadStatementPDF 
        nameSurnameApplicant={nameSurname} 
        nameSurnameDepartmentHead={department.split(" - ")[1]?.trim() || ""}
        departmentName={department.split(" - ")[0]?.trim() || ""}
        projectName={projectTitle}
        />;
    
        // Create a PDF blob
        pdf(doc).toBlob().then(blob => {
        // Create a Blob URL
        const url = URL.createObjectURL(blob);
    
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Izjava predstojnika zavoda.pdf';  // Specify the filename to download
    
        // Append the link to the body, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        // Optional: Release the Blob URL to free up resources
        URL.revokeObjectURL(url);
    }).catch(err => {
      console.error(err);
    });
  } 

    return ( 
        <div id="generiraj-izjavu-predstojnika-zavoda-container">
            <button onClick={handlePDF} className='default-button'>GENERIRAJ IZJAVU PREDSTOJNIKA ZAVODA</button>
        </div>
     );
}
 
export default GenerateHeadOfDepartmentStatement;