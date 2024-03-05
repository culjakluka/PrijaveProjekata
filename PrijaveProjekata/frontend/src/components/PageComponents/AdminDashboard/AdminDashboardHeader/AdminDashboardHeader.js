import './AdminDashboardHeader.css'

// icons
import logo from './fesb_unist_logo_white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'; // Import the solid gear icon


const AdminDashboardHeader = () => {
    return (  
        <div className="admin-dashboard-header-container">
            <img className="header-logo" src={logo}/>
            <FontAwesomeIcon icon={faCog} size="2x" color='#ffffff' />
        </div>
    );
}
 
export default AdminDashboardHeader;