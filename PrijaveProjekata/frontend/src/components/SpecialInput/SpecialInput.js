import React, {useState, useEffect} from "react";
import styles from './SpecialInput.css'
import SpecialInputMember from "./SpecialInputMember/SpecialInputMember";
import SpecialInputProject from "./SpecialInputProject/SpecialInputProject";
import SpecialInputMemberContainer from "./SpecialInputMemberContainer/SpecialInputMemberContainer";
import './SpecialInput.css'


const SpecialInput = ({pitanje}) => {
    let label="NAVEDITE SVE ČLANOVE..."

    const [components, setComponents] = useState([]);

    function addNewMember() {

      }

    return (
        <div className="special-input-container">   
            <p>{pitanje}</p>
            <SpecialInputMemberContainer/>
            <button onClick={addNewMember}>ADD NEW MEMBER</button>

        </div>
      );
}
 
export default SpecialInput;