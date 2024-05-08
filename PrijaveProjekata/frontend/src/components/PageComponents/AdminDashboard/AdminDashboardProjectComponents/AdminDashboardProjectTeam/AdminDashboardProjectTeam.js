import React, { useContext } from 'react';

// styles
import Style from './AdminDashboardProjectTeam.module.css';

// context
import { AdminDashboardContext } from '../../../../../context/AdminDashboardContext';

const AdminDashboardProjectTeam = () => {
    
    const { selectedProject } = useContext(AdminDashboardContext);

    
    return (  
        <div className={Style.AdminDashboardProjectTeamContainer}>
            {selectedProject?.projectTeam?.map((member, index) => (
                <div className={Style.AdminDashboardProjectTeamMember}>
                    <div className={Style.AdminDashboardProjectTeamMemberInfo}>
                        <div style={{marginRight:"10px"}}>{member.nameSurname}</div>
                        <div>{member.thisProjectPercentage}%</div>
                    </div>
                    
                    <div className={Style.AdminDashboardProjectOtherProjectsTitle}>OSTALI PROJEKTI:</div>
                    {member.otherProjects.map((project, index) => (
                        <div className={Style.AdminDashboardProjectTeamMemberOtherProjects}>
                            <div className={Style.AdminDashboardProjectTeamOtherProjectInfo}>
                                {project.otherProjectName} {project.otherProjectPercentage}%
                            </div>
                        </div>
                    
                    ))}
                </div>
            ))}
        </div>
    );
}
 
export default AdminDashboardProjectTeam;