import PdfAttach from "../../PageComponents/PdfAttach/PdfAttach";

const AttachCurrentlyAvailableBudget = ({ onFilesSelect }) => {
    return ( 
        <div>
            <p>Trenutno dostupan proračun projekta u PDF-u</p>
            <PdfAttach onFilesSelect={onFilesSelect} />
        </div>
     );
}
 
export default AttachCurrentlyAvailableBudget;