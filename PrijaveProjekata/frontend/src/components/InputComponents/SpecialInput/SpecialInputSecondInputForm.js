import React, { useState, useEffect, useContext } from "react";
import SpecialInputMemberContainer from "./SpecialInputMemberContainer/SpecialInputMemberContainer.js";
import Style from "./SpecialInputSecondInputForm.module.css";
import CompletedMember from "../CompletedMember/CompletedMember.js";
import { SpecialInputContext } from "./SpecialInputContext.js";
import { SecondInputFormDataConext } from "../../../context/SecondInputFormDataContext.js";

const SpecialInputSecondInputForm = ({ name, pitanje }) => {
  // projectMembers contains members that consist of this fields named: - newItemNameSurname
  //                                                                    - newItemEmail
  //                                                                    - newItemPercentag

  // using projectTeam from context
  const { projectTeam, setProjectTeam } = useContext(SecondInputFormDataConext);

  // project members
  const [projectMembers, setProjectMembers] = useState([]);
  const [addMemberFormIsActive, setAddMemberFormIsActive] = useState(false);

  // when component mounts
  useEffect(() => {
    const sessionStorageProjectMembers = sessionStorage.getItem(name);

    // preventing data from disappearing after refreshing page
    if (sessionStorageProjectMembers) {
      const serializedState = JSON.parse(sessionStorageProjectMembers);
      setProjectTeam(serializedState);
    }
  }, []);

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
      <div className={Style.specialInputContainer}>
        <p className={Style.question}>{pitanje}</p>
        <p>Svi članovi:</p>
        <div id={Style.addedProjectMember}>
          <div id={Style.specialInputCompletedMembers}>
            {/* GENERATING COMPLETED PROJECT MEMBERS */}
            {projectTeam.length > 0 ? (
              projectTeam.map((member, index) => (
                <CompletedMember
                  key={index}
                  memberId={index}
                  fullName={member.nameSurname}
                  email={member.email}
                  percent={member.thisProjectPercentage}
                  projectsArray={member.otherProjects}
                  deleteSingleMember={deleteMember}
                />
              ))
            ) : (
              <p>niste dodali niti jednog člana...</p>
            )}
          </div>
        </div>

        {/* INPUT FORM FOR NEW MEMBER */}
        {addMemberFormIsActive ? (
          <SpecialInputMemberContainer addProjectMember={addNewMember} />
        ) : null}

        <button onClick={manageInputForm} id={Style.specialInputPlus}>
          {addMemberFormIsActive ? "-" : "DODAJ NOVOG ČLANA"}
        </button>
      </div>
    </SpecialInputContext.Provider>
  );
};

export default SpecialInputSecondInputForm;
