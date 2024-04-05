import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import FirstInputFormPDF from '../../InputComponents/PDF/FirstInputFormPDF'

const ParlovTest = () => {
    return (  
        <div>
            <PDFViewer style={{width : "100%", height: "100vh" }}>
                <FirstInputFormPDF/>
            </PDFViewer>
        </div>
    );
}
 
export default ParlovTest;