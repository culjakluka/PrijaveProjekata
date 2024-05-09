import { React, useContext } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faTimes as faXmark } from '@fortawesome/free-solid-svg-icons';

// style
import Style from './ModalDeclineProject.module.css';

// context
import { AdminDashboardContext } from "../../../../../context/AdminDashboardContext";

// api
import { rejectProject } from '../../ApiRequests';

const ModalDeclineProject = () => {

    const {
        modalDeclineProjectIsOpen,
        setModalDeclineProjectIsOpen,
        selectedProject
    } = useContext(AdminDashboardContext)

    const handleYesButton = () => {
        //TO-DO
        rejectProject(selectedProject._id);
        setModalDeclineProjectIsOpen(false);
    }

    const handleNoButton = () => {
        setModalDeclineProjectIsOpen(false);
    }

    const closeModal = () => {
        setModalDeclineProjectIsOpen(false);    
    }


    return (  
        <div className={Style.ModalContainerOverlay}>
        <div className={Style.Modal}>
            <div className={Style.ModalTopContainer}>
                <div className={Style.ModalClose}>
                        <FontAwesomeIcon onClick={() => closeModal()} icon={faXmark} size='1x'/>
                </div>
                <h3 className={Style.ModalQuestion}>Odbij projekt?</h3>
            </div>
            
            <div className={Style.ModalButtonsContainer}>
                <button onClick={() => handleYesButton()} className={Style.ModalButton}>DA</button>
                <button onClick={() => handleNoButton()} className={Style.ModalButton}>NE</button>
            </div>
        </div>
    </div>
    );
}
 
export default ModalDeclineProject;