import React, {useState, useEffect} from "react";
import styles from './SpecialInput.css'
import SpecialInputMember from "./SpecialInputMember/SpecialInputMember";
import SpecialInputProject from "./SpecialInputProject/SpecialInputProject";
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

            {/* finilized project members are going to be added inside <div> below */}
            <div id="added-project-member">
              {/* ...rendering components... */}
              <div style={{border:'solid purple'}}> 
            {projectMembers.length > 0 ? projectMembers.map((member, index) => (
                <CompletedMember key={index} fullName={member.newItemNameSurname} email={member.newItemEmail} percent={member.newItemPercentage} projects={member.projects} />
                )) : (<p>you didn't add any member...</p>)
              }
              </div>
              {/* ...end of rendering... */}
            </div>

            {/* // <SpecialInputMemberContainer> is actually input form for new element/memeber 
                // it takes function addNewMember as a prop which is passed to another component
                // all the way until destination component is reached - component that will trigger it
            */}

    
            <SpecialInputMemberContainer addProjectMember={addNewMember}/>
            <button>+</button>
        </div>
      );
}
 
export default SpecialInput;