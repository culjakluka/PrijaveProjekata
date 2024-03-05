import React, { useEffect, useState, useContext} from 'react';
import { AdminDashboardContext } from '../../../../context/AdminDashboardContext';

// style
import Style from './ModalSettings.module.css'

// external components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// my components
import Dean from './Dean/Dean';
import Department from './Department/Department';



const ModalSettings = ({}) => {

    const { modalIsOpen, setModalIsOpen } = useContext(AdminDashboardContext);
    
    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (  
        <div className={Style.ModalContainerOverlay}>
            <div className={Style.Modal}>
                <div className={Style.ModalTopBar}>
                    <FontAwesomeIcon onClick={() => closeModal()} icon={faXmark} size='1x'/>
                </div>

                <div className={Style.ModalContent}>
                    <div className={Style.DeanInfo}>
                        <Dean />
                    </div>

                    <div className={Style.DepartmentsInfo}>
                        <Department />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ModalSettings;