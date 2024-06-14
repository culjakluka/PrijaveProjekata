import { React, useEffect, useState } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faTimes as faXmark } from '@fortawesome/free-solid-svg-icons';

// style
import Style from './ModalTemplate.module.css';

const ModalTemplate = (height, width, modalMessage, anotherMessag) => {

    const[heightPercentage, setHeightPercentage] = useState("25%");
    const[widthPercentage, setWidthPercentage] = useState("30%");
    const [message, setMessage] = useState("Are you sure?");

    // context - here bring the context of component here

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
        //TO-DO
    }

    const handleNoButton = () => {
        //TO-DO
    }

    const closeModal = () => {
        //TO-DO
    }


    return (
        <div className={Style.ModalContainerOverlay}>
            <div className={Style.Modal} style={{height: heightPercentage, width: widthPercentage }}>
                <div className={Style.ModalTopContainer}>
                    <button className={Style.ModalClose}onClick={() => closeModal()}>
                        <FontAwesomeIcon icon={faXmark} size='1x'/>
                    </button>
                    <h3 className={Style.ModalQuestion}>{message}</h3>
                </div>
            
                <div className={Style.ModalButtonsContainer}>
                    <button onClick={() => handleYesButton()} className={Style.ModalYesButton}>DA</button>
                    <button onClick={() => handleNoButton()} className={Style.ModalNoButton}>NE</button>
                </div>
            </div>
        </div>
    );
}
 
export default ModalTemplate;