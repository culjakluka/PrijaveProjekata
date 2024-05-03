import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import FirstInputFormPDF from '../../InputComponents/PDF/FirstInputFormPDF'
import { firstInputFormData, secondInputFormData } from '../../InputComponents/PDF/data'

const ParlovTest = () => {
    return (  
        <div>
            <PDFViewer style={{width : "100%", height: "100vh" }}>
                <FirstInputFormPDF data={secondInputFormData}/>
            </PDFViewer>
        </div>
    );
}
 
export default ParlovTest;