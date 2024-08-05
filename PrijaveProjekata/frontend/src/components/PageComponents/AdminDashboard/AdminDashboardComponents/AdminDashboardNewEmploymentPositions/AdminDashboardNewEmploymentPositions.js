import React, { useContext } from "react";

// stlyes
import Style from './AdminDashboardNewEmploymentPositions.module.css';


// context
import { AdminDashboardContext } from "../../../../../context/AdminDashboardContext";

const AdminDashboardNewEmploymentPositions = () => {

    const { selectedProject } = useContext(AdminDashboardContext);

    return (  
        <div className={Style.NewEmploymentPositionsContainer}>
            <div style={{fontWeight: '700', color: '#5a5a5a'}}>POPIS NOVIH RADNIH MJESTA:</div>
            {selectedProject?.newEmploymentPositions?.map((member, index) => (
                <div className={Style.NewPosition}>
                    <div className={Style.NewPositionInfo}>Ime: {member.positionName}</div>
                    <div className={Style.NewPositionInfo}>Bruto plaća: {member.positionSalary}€</div>
                    <div className={Style.NewPositionInfo}>Postotak radnog vremena: {member.positionPercentage}%</div>
                </div>
            ))}
        </div>
    );
}
 
export default AdminDashboardNewEmploymentPositions;