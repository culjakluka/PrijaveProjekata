import './AdminDashboardHeader.css'
import logo from './fesb_unist_logo_white.png'


const AdminDashboardHeader = () => {
    return (  
        <div className="admin-dashboard-header-container">
            <img className="header-logo" src={logo}/>
        </div>
    );
}
 
export default AdminDashboardHeader;