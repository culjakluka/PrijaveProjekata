import React, { useEffect, useState, useContext} from 'react';
import { AdminDashboardContext } from '../context/AdminDashboardContext';

// style
import Style from './ModalSettings.module.css'


const ModalSettings = ({}) => {

    const { modalIsOpen, setModalIsOpen } = useContext(AdminDashboardContext);
    
    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (  
        <div className={Style.ModalContainerOverlay}>
            <div className={Style.Modal}>
                <div className={Style.ModalTopBar}>
                    <button onClick={() => closeModal()} className={Style.CloseModal}>X</button>
                </div>
                <div className={Style.ModalContent}>
                    
                </div>
            </div>
        </div>
    );
}
 
export default ModalSettings;