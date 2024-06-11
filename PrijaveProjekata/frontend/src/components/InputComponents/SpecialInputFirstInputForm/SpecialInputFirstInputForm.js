import React, { useState, useEffect, useContext } from "react";
import SpecialInputMemberContainer from "./SpecialInputMemberContainer/SpecialInputMemberContainer.js";
import { SpecialInputContext } from "./SpecialInputContext.js";
import { FirstInputFormDataContext } from "../../../context/FirstInputFormDataContext.js";
import { SecondInputFormDataContext } from "../../../context/SecondInputFormDataContext.js";

// styles
import Style from "./SpecialInputFirstInputForm.module.css";

const SpecialInputForm = ({ name, pitanje, formType }) => {
  // Determine the context to use based on formType
  const { projectTeam, setProjectTeam } = useContext(
    formType === "first" ? FirstInputFormDataContext : SecondInputFormDataContext
  );

  // project members
  const [projectMembers, setProjectMembers] = useState([]);
  const [addMemberFormIsActive, setAddMemberFormIsActive] = useState(false);
  const [deleteMemberIsActive, setDeleteMemberIsActive] = useState(false);

  // when component mounts
  useEffect(() => {
    const sessionStorageProjectMembers = sessionStorage.getItem(name);

    // preventing data from disappearing after refreshing page
    if (sessionStorageProjectMembers) {
      const serializedState = JSON.parse(sessionStorageProjectMembers);
      setProjectTeam(serializedState);
    }
  }, [name, setProjectTeam]);

  // add new member
  const addNewMember = (newMember) => {
    setProjectTeam((prevMembers) => {
      // Use the updated state to ensure correctness
      const updatedMembers = [...prevMembers, newMember];

      // Store the updated state in sessionStorage
      const serializedState = JSON.stringify(updatedMembers);
      sessionStorage.setItem(name, serializedState);

      // Return the new state
      return updatedMembers;
    });
  };

  // delete member
  const deleteMember = (memberId) => {
    setProjectTeam((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers.splice(memberId, 1);
      sessionStorage.setItem(name, JSON.stringify(updatedMembers));
      return updatedMembers;
    });
  };

  function manageInputForm() {
    setAddMemberFormIsActive(!addMemberFormIsActive);
    sessionStorage.setItem("member_form_is_active", addMemberFormIsActive);
  }

  return (
    <SpecialInputContext.Provider value={{ projectMembers, setProjectMembers }}>
      <div className={Style.SpecialInputContainer}>
        <p className="question">{pitanje}</p>

        {/* INPUT FORM FOR NEW MEMBER */}
        {addMemberFormIsActive ? (
          <SpecialInputMemberContainer addProjectMember={addNewMember} />
        ) : null}

        <button onClick={manageInputForm} className={addMemberFormIsActive ? Style.SpecialInputMinus : Style.SpecialInputPlus}>
          {addMemberFormIsActive ? "SAKRIJ" : "DODAJ NOVOG ČLANA"}
        </button>

        {/* ALL MEMBERS - PRINTING ALL MEMBERS */}
        <div className={Style.SpecialInputCompletedMembers}>
          <div style={{display:"flex", flexDirection:"row"}}>
            <p style={{margin:"0px"}}>Svi članovi:</p>
            {projectTeam.length > 0 &&
            <button onClick={() => setDeleteMemberIsActive(!deleteMemberIsActive)} className={Style.EditProjectTeamMembers}>
              {deleteMemberIsActive ? "ZAVRŠI UREĐIVANJE" : "UREDITE ČLANOVE"}
            </button>
            } 
          </div>
          
          {projectTeam.length > 0 ? (
            projectTeam.map((member, index) => (
              <div key={index} className={Style.ProjectTeamMember}>
                <div className={Style.ProjectTeamMemberInfo}>
                  <div style={{marginRight:"10px"}}>{member.nameSurname}</div>
                  <div style={{marginRight:"10px"}}>({member.email})</div>
                  <div>- {member.thisProjectPercentage}%</div>
                  {deleteMemberIsActive && (
                    <div style={{marginLeft: "auto", fontWeight: "400", textDecoration: "underline", border: "none"}}>
                      <button onClick={() => deleteMember(index)} className={Style.DeleteMemberYesNo}>IZBRIŠI</button>
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
            ))
          ) : (
            <p>niste dodali niti jednog člana...</p>
          )}
        </div>
      </div>
    </SpecialInputContext.Provider>
  );
};

export default SpecialInputForm;
