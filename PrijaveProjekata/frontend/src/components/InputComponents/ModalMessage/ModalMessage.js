import { React, useEffect, useState, useContext } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faTimes as faXmark } from '@fortawesome/free-solid-svg-icons';

// style
import Style from './ModalMessage.module.css';

// context 
import { FirstInputFormDataContext } from '../../../context/FirstInputFormDataContext';

const ModalTemplate = (height, width, modalMessage, missingFieldsContent) => {

    const[heightPercentage, setHeightPercentage] = useState("40%");
    const[widthPercentage, setWidthPercentage] = useState("30%");
    const [message, setMessage] = useState("Molimo popunite sva polja!");

    // context - here bring the context of component here
    const{ setModalMessageIsOpen, missingFields } = useContext(FirstInputFormDataContext);

    useEffect(() => {
        if(height) {
            setHeightPercentage(height);
        }

        if(width) {
            setWidthPercentage(width);
        }

        if(modalMessage) {
            setMessage(modalMessage);
        }

    }, []);

    const handleYesButton = () => {
        setModalMessageIsOpen(false)
    }

    return (
        <div className={Style.ModalContainerOverlay}>
            <div className={Style.Modal} style={{height: heightPercentage, width: widthPercentage }}>
                <div className={Style.ModalTopContainer}>
                    <h3 className={Style.ModalQuestion}>{message}</h3>
                </div>
                <div className={Style.ModalMissingFieldsContainer}>
                    <p>{missingFields}</p>
                </div>
            
                <div className={Style.ModalButtonsContainer}>
                    <button onClick={() => handleYesButton()} className={Style.ModalYesButton}>U REDU</button>
                </div>
            </div>
        </div>
    );
}
 
export default ModalTemplate;