import { React, useEffect, useState, useContext } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faTimes as faXmark } from '@fortawesome/free-solid-svg-icons';

// style
import Style from './ModalApplicationSubmitted.module.css';

// context
import { FirstInputFormDataContext } from '../../../context/FirstInputFormDataContext';

const ModalApplicationSubmitted = (height, width, modalMessage, anotherMessag) => {

    const[heightPercentage, setHeightPercentage] = useState("25%");
    const[widthPercentage, setWidthPercentage] = useState("30%");
    const [message, setMessage] = useState("Prijava uspješno poslana!");

    // context - here bring the context of component here
    const { setModalApplicationSubmittedIsOpen } = useContext(FirstInputFormDataContext);

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
        setModalApplicationSubmittedIsOpen(false);
        window.location.reload();
    }


    return (
        <div className={Style.ModalContainerOverlay}>
            <div className={Style.Modal} style={{height: heightPercentage, width: widthPercentage }}>
                <h3 className={Style.ModalQuestion}>{message}</h3>
            
                <div className={Style.ModalButtonsContainer}>
                    <button onClick={() => handleYesButton()} className={Style.ModalYesButton}>U REDU</button>
                </div>
            </div>
        </div>
    );
}
 
export default ModalApplicationSubmitted;