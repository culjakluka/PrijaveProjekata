import React, { useState } from "react";

// styles
import Style from '../SpecialInputFirstInputForm.module.css'

const ProjectTeamCompletedMember = (sessionStorageName, member, indexMember, setProjectTeamCallback) => {

    const [deleteMemberIsActive, setDeleteMemberIsActive] = useState(false);

    // delete member
    const deleteMember = (memberId) => {
        setProjectTeamCallback((prevMembers) => {
        const updatedMembers = [...prevMembers];
        updatedMembers.splice(memberId, 1);
        sessionStorage.setItem(sessionStorageName, JSON.stringify(updatedMembers));
        return updatedMembers;
        });
    };

    return (  
        <div className={Style.ProjectTeamMember}>
                    <div className={Style.ProjectTeamMemberInfo}>
                        <div style={{marginRight:"10px"}}>{member.nameSurname}</div>
                        <div style={{marginRight:"10px"}}>({member.email})</div>
                        <div>- {member.thisProjectPercentage}%</div>
                        {!deleteMemberIsActive ? 
                          <button onClick={() => setDeleteMemberIsActive(true)} style={{marginLeft: "auto", fontWeight: "400", textDecoration: "underline", border: "none",}}>ukloni člana</button>
                        : (
                          <div style={{marginLeft: "auto", fontWeight: "400", textDecoration: "underline", border: "none",}}>
                            <button onClick={() => deleteMember(indexMember)}className={Style.DeleteMemberYesNo}>DA</button>
                            <button onClick={() => setDeleteMemberIsActive(false)} className={Style.DeleteMemberYesNo}>NE</button>
                          </div>
                        )}
                    </div>
                    
                    <div className={Style.ProjectOtherProjectsTitle}>OSTALI PROJEKTI:</div>
                    {member.otherProjects.map((project, indexProject) => (
                        <div key={indexProject} className={Style.ProjectTeamMemberOtherProjects}>
                            <div className={Style.ProjectTeamOtherProjectInfo}>
                                {project.otherProjectName} - {project.otherProjectPercentage}%
                            </div>
                        </div>
                    
                    ))}
                </div>
    );
}
 
export default ProjectTeamCompletedMember;