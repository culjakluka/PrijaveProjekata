import React, {useState, useEffect} from "react";
import styles from './SpecialInput.css'
import SpecialInputMemberContainer from "./SpecialInputMemberContainer/SpecialInputMemberContainer";
import './SpecialInput.css'
import CompletedMember from "../CompletedMember/CompletedMember"


const SpecialInput = ({pitanje, sendProjectMembers}) => {
    // projectMembers contains members that consist of this fields named: - newItemNameSurname
    //                                                                    - newItemEmail
    //                                                                    - newItemPercentage

    const[projectMembers, setProjectMembers] = useState([]);

    // function that adds new member
    // function is being triggered by component/element where is it located
    const addNewMember = (newMember) => {
      setProjectMembers((prevMembers) => [...prevMembers, newMember]);
      // console.log(projectMembers)
    }

    // keeping track of projectMembers
    useEffect(() => {
       console.log(projectMembers)
       sendProjectMembers(projectMembers)
    }, [projectMembers])
    
    return (
        <div className="special-input-container">   
            <p className="question">{pitanje}</p>
            <p>All members:</p>
            <div id="added-project-member">
              <div id="special-input-completed-members"> 
                {projectMembers.length > 0 ? projectMembers.map((member, index) => (
                  <CompletedMember key={index} fullName={member.nameSurname} email={member.email} percent={member.thisProjectPercentage} projects={member.otherProjects} />
                  )) : <p>you didn't add any members...</p>}
              </div>
            </div>
            {/* // <SpecialInputMemberContainer> is actually input form for new element/memeber 
                // it takes function addNewMember as a prop which is passed to another component
                // all the way until destination component is reached - component that will trigger it
            */}
            <SpecialInputMemberContainer addProjectMember={addNewMember}/>
            <button id="special-input-plus">+</button>
        </div>
      );
}
 
export default SpecialInput;