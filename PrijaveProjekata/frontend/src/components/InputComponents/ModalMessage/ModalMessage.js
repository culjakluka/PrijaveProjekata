import { React, useEffect, useState, useContext } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faTimes as faXmark } from '@fortawesome/free-solid-svg-icons';

// style
import Style from './ModalMessage.module.css';

// context 
import { FirstInputFormDataContext } from '../../../context/FirstInputFormDataContext';

const ModalMessage = ({ height, width, modalMessage, missingFieldsContent, setModalIsOpen, reload }) => {

    const[heightPercentage, setHeightPercentage] = useState("20%");
    const[widthPercentage, setWidthPercentage] = useState("30%");
    const [message, setMessage] = useState("Molimo popunite sva polja!");



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
        setModalIsOpen(false)
        if(reload) {
            window.location.reload()
        }
    }

    return (
        <div className={Style.ModalContainerOverlay}>
            <div className={Style.Modal} style={{height: heightPercentage, width: widthPercentage }}>
                <div className={Style.ModalMessageContainer}>
                    <h3 className={Style.ModalQuestion}>{message}</h3>
                </div>
                <div className={Style.ModalButtonsContainer}>
                    <button onClick={() => handleYesButton()} className={Style.ModalYesButton}>U REDU</button>
                </div>
            </div>
        </div>
    );
}
 
export default ModalMessage;