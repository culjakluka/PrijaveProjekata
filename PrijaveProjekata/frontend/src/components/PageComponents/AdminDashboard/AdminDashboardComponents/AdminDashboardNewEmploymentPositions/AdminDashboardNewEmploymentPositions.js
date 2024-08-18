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
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div className={Style.NewPositionInfoTitle}>Ime: </div>
                        <div className={Style.NewPositionInfo}>{member.positionName}</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div className={Style.NewPositionInfoTitle}>Bruto plaća: </div>
                        <div className={Style.NewPositionInfo}>{member.positionSalary}€</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div className={Style.NewPositionInfoTitle}>Postotak radnog vremena: </div>
                        <div className={Style.NewPositionInfo}>{member.positionPercentage}%</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default AdminDashboardNewEmploymentPositions;