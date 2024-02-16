import PdfAttach from "../PdfAttach/PdfAttach";

const AttachAdditionalDocumentation = ({ onFilesSelect }) => {
    return ( 
        <div>
            <p>Ukoliko postoji dodatna dokumentacija o projektu(prijavni obrazac, Tablica proračuna, i sl.) možete je priložiti</p>
            <PdfAttach onFilesSelect={onFilesSelect} />
        </div>
     );
}
 
export default AttachAdditionalDocumentation;