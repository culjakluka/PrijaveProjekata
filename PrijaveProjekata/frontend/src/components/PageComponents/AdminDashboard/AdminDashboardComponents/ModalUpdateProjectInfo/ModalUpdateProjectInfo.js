import React, { useState, useEFfect, useContext} from "react";

// external icons

// external components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

// style
import Style from './ModalUpdateProjectInfo.module.css'

// context
import { AdminDashboardContext } from "../../../../../context/AdminDashboardContext";

const ModalUpdateProjectInfo = () => {

    const {modalUpdateProjectInfoIsOpen, setModalUpdateProjectInfoIsOpen, handleEditable, updateProjectData, setUpdateProjectData} = useContext(AdminDashboardContext)

    const handleYesButton = () => {
        handleEditable();
        setModalUpdateProjectInfoIsOpen(false);
        setUpdateProjectData({})
    }

    const handleNoButton = () => {
        setModalUpdateProjectInfoIsOpen(false);
    }

    const closeModal = () => {
        setModalUpdateProjectInfoIsOpen(false);
    }

    return (  
        <div className={Style.ModalContainerOverlay}>
            <div className={Style.Modal}>
                <div className={Style.ModalTopContainer}>
                    <div className={Style.ModalClose}>
                            <FontAwesomeIcon onClick={() => closeModal()} icon={faXmark} size='1x'/>
                    </div>
                    <h3 className={Style.ModalQuestion}>Završi uređivanje dokumenta?</h3>
                </div>
                
                <div className={Style.ModalButtonsContainer}>
                    <button onClick={() => handleYesButton()} className={Style.ModalButton}>DA</button>
                    <button onClick={() => handleNoButton()} className={Style.ModalButton}>NE</button>
                </div>
            </div>
        </div>
    );
}
 
export default ModalUpdateProjectInfo;