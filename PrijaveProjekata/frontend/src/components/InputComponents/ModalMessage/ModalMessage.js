import { React, useContext } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faTimes as faXmark } from '@fortawesome/free-solid-svg-icons';

// style
import Style from './ModalMessage.module.css';

const ModalMessage = () => {

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
        <div className={Style.Modal}>
            <div className={Style.ModalTopContainer}>
                <button className={Style.ModalClose} onClick={() => closeModal()}>
                        <FontAwesomeIcon icon={faXmark} size='1x'/>
                </button>
                <h3 className={Style.ModalQuestion}>Odbaci promjene?</h3>
            </div>
            
            <div className={Style.ModalButtonsContainer}>
                <button onClick={() => handleYesButton()} className={Style.ModalButton}>DA</button>
                <button onClick={() => handleNoButton()} className={Style.ModalButton}>NE</button>
            </div>
        </div>
    </div>
    );
}
 
export default ModalMessage;