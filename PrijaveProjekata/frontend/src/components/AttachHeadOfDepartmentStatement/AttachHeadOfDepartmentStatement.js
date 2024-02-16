import PdfAttach from '../PdfAttach/PdfAttach'

const AttachHeadOfDepartmentStatement = ({ onFilesSelect }) => {
    return ( 
        <div>
            <p> Izjava predstojnika zavoda, Privola za slanje osobnih podataka trećim stranama</p>
            <PdfAttach onFilesSelect={onFilesSelect} />
        </div>
     );
}
 
export default AttachHeadOfDepartmentStatement;