import React, {useState, useEffect, useContext} from "react";
import SpecialInputMemberContainer from "./SpecialInputMemberContainer/SpecialInputMemberContainer.js";
import CompletedMember from "../CompletedMember/CompletedMember.js"
import { SpecialInputContext } from './SpecialInputContext.js'
import { FirstInputFormDataContext } from "../../../context/FirstInputFormDataContext.js";

// styles
import Style from './SpecialInputFirstInputForm.module.css'

const SpecialInputFirstInputForm = ({name, pitanje}) => {
    // projectMembers contains members that consist of this fields named: - newItemNameSurname
    //                                                                    - newItemEmail
    //                                                                    - newItemPercentag

    // using projectTeam from context
    const {projectTeam, setProjectTeam } = useContext(FirstInputFormDataContext); 

    // project members
    const[projectMembers, setProjectMembers] = useState([]);
    const[addMemberFormIsActive, setAddMemberFormIsActive] = useState(false);

    // when component mounts 
    useEffect(() => {
      const sessionStorageProjectMembers = sessionStorage.getItem(name,);

      // preventing data from disappearing after refreshing page
      if(sessionStorageProjectMembers) {
        const serializedState = JSON.parse(sessionStorageProjectMembers);
        setProjectTeam(serializedState);
      }

    }, [])


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
      
      }

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
      setAddMemberFormIsActive(!addMemberFormIsActive)
      sessionStorage.setItem("member_form_is_active", addMemberFormIsActive)
    }

    
    return (
        <SpecialInputContext.Provider value={{projectMembers, setProjectMembers}}>
          <div className={Style.SpecialInputContainers}>   
              <p className="question">{pitanje}</p>
              <p>All members:</p>
              <div id="added-project-member">
                <div id="special-input-completed-members"> 
                  {/* GENERATING COMPLETED PROJECT MEMBERS */}
                  {projectTeam.length > 0 ? projectTeam.map((member, index) => (
                    <CompletedMember key={index} memberId={index} fullName={member.nameSurname} email={member.email} percent={member.thisProjectPercentage} projectsArray={member.otherProjects} deleteSingleMember={deleteMember}/>
                    )) : <p>you didn't add any members...</p>}

                </div>
              </div>

              {/* INPUT FORM FOR NEW MEMBER */}
              {addMemberFormIsActive ? <SpecialInputMemberContainer addProjectMember={addNewMember}/> : null}

              <button onClick={manageInputForm} id="special-input-plus">{addMemberFormIsActive ? "-" : "ADD NEW MEMBER"}</button>
          </div>
        </SpecialInputContext.Provider>
      );
}
 
export default SpecialInputFirstInputForm;