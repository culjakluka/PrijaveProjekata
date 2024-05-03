import React, { useState, useEFfect, useContext} from "react";

// style 
import Style from './ModalDiscardChanges.module.css'

// context
import { AdminDashboardContext } from "../../../../../context/AdminDashboardContext";

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const ModalDiscardChanges = () => {

    const { 
        modalDiscardChangesIsOpen,
        setModalDiscardChangesIsOpen,
        handleEditable,
        setProjectEditable,
        setProjectLocked

     } = useContext(AdminDashboardContext)

    const handleYesButton = () => {
        handleEditable();
        setProjectEditable(false);
        setProjectLocked(true);
        setModalDiscardChangesIsOpen(false);
    }

    const handleNoButton = () => {
        setModalDiscardChangesIsOpen(false);
    }

    const closeModal = () => {
        setModalDiscardChangesIsOpen(false);
    }

    return (  
        <div className={Style.ModalContainerOverlay}>
            <div className={Style.Modal}>
                <div className={Style.ModalTopContainer}>
                    <div className={Style.ModalClose}>
                            <FontAwesomeIcon onClick={() => closeModal()} icon={faXmark} size='1x'/>
                    </div>
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
 
export default ModalDiscardChanges;