import React, {useState, useEffect} from "react";
import styles from './SpecialInput.css'
import SpecialInputMember from "./SpecialInputMember/SpecialInputMember";
import SpecialInputProject from "./SpecialInputProject/SpecialInputProject";
import SpecialInputMemberContainer from "./SpecialInputMemberContainer/SpecialInputMemberContainer";
import './SpecialInput.css'


const SpecialInput = ({pitanje, getProjectMembers}) => {
    let label="NAVEDITE SVE ČLANOVE..."

    const[projectMembers, setProjectMembers] = useState([]);

    const addNewMember = (newMember) => {
      setProjectMembers(...projectMembers, newMember)
      console.log(projectMembers)
    }

    return (
        <div className="special-input-container">   
            <p>{pitanje}</p>
            <p>you didn't add any members....</p>
            <SpecialInputMemberContainer addProjectMember={addNewMember}/>
            <button>+</button>
        </div>
      );
}
 
export default SpecialInput;