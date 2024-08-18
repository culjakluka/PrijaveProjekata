import PdfAttach from '../../PageComponents/PdfAttach/PdfAttach'

const AttachHeadOfDepartmentStatement = ({ onFilesSelect, setMissingHeadOfDepartmentStatement }) => {
    return ( 
        <div>
            <p> Izjava predstojnika zavoda, Privola za slanje osobnih podataka trećim stranama</p>
            <PdfAttach onFilesSelect={onFilesSelect} setMissingHeadOfDepartmentStatement={setMissingHeadOfDepartmentStatement} handlesHeadOfDepartmentStatement={true} />
        </div>
     );
}
 
export default AttachHeadOfDepartmentStatement;