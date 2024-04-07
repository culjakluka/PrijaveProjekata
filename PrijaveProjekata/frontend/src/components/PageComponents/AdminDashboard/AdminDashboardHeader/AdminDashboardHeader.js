import React, { useContext } from 'react';

// context
import { AdminDashboardContext } from '../../../../context/AdminDashboardContext.js';

// style
import './AdminDashboardHeader.css'

// icons
import logo from './fesb_unist_logo_white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmbulance, faCog } from '@fortawesome/free-solid-svg-icons'; // Import the solid gear icon


const AdminDashboardHeader = () => {

    const { modalSettingsIsOpen, setModalSettingsIsOpen } = useContext(AdminDashboardContext);

    const openModal = () => {
        setModalSettingsIsOpen(true);
    }

    return (  
        <div className="admin-dashboard-header-container">
            <img className="header-logo" src={logo}/>
            <FontAwesomeIcon class="admin-dashboard-settings-icon" onClick={() => openModal()} icon={faCog} size="2x" color='#ffffff' />
        </div>
    );
}
 
export default AdminDashboardHeader;