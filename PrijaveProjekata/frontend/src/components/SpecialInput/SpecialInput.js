import React, {useState, useEffect} from "react";
import styles from './SpecialInput.css'
import SpecialInputMemberContainer from "./SpecialInputMemberContainer/SpecialInputMemberContainer";
import './SpecialInput.css'
import CompletedMember from "../CompletedMember/CompletedMember"
import { SpecialInputContext } from './SpecialInputContext'

const SpecialInput = ({pitanje, sendProjectMembers}) => {
    // projectMembers contains members that consist of this fields named: - newItemNameSurname
    //                                                                    - newItemEmail
    //                                                                    - newItemPercentag


    // project members
    const[projectMembers, setProjectMembers] = useState([]);
    const[addMemberFormIsActive, setAddMemberFormIsActive] = useState(false);

    // when component mounts
    useEffect(() => {
      const sessionStorageProjectMembers = sessionStorage.getItem("session_storage_project_members");
      const addMemberForm = sessionStorage.getItem("session_storage_add_member_form_is_active");

      if(sessionStorageProjectMembers) {
        const serializedState = JSON.parse(sessionStorageProjectMembers);
        setProjectMembers(serializedState);
        sendProjectMembers(serializedState)
      }

      if(addMemberForm) {
        setAddMemberFormIsActive(addMemberForm);
      }

    }, [])

      // add new member
      const addNewMember = (newMember) => {

      setProjectMembers((prevMembers) => {
        // Use the updated state to ensure correctness
        const updatedMembers = [...prevMembers, newMember];
    
        // Store the updated state in sessionStorage
        const serializedState = JSON.stringify(updatedMembers);
        sessionStorage.setItem("session_storage_project_members", serializedState);
    
        // Return the new state
        return updatedMembers;
      });
      
      }

      // delete member
      const deleteMember = (memberId) => {
        setProjectMembers((prevMembers) => {
        const updatedMembers = [...prevMembers];
        updatedMembers.splice(memberId, 1);
        sessionStorage.setItem("session_storage_project_members", JSON.stringify(updatedMembers));
        return updatedMembers;
        });
      };


    // keeping track of projectMembers
    // if it changes, send it to parent component(using function sendProjectMembers)
    useEffect(() => {
       console.log(projectMembers)

       sendProjectMembers(projectMembers)
    }, [projectMembers])


    function manageInputForm() {
      setAddMemberFormIsActive(!addMemberFormIsActive)
      sessionStorage.setItem("session_storage_add_member_form_is_active", addMemberFormIsActive)
    }

    
    return (
        <SpecialInputContext.Provider value={{projectMembers, setProjectMembers}}>
          <div className="special-input-container">   
              <p className="question">{pitanje}</p>
              <p>All members:</p>
              <div id="added-project-member">
                <div id="special-input-completed-members"> 
                  {/* GENERATING COMPLETED PROJECT MEMBERS */}
                  {projectMembers.length > 0 ? projectMembers.map((member, index) => (
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
 
export default SpecialInput;