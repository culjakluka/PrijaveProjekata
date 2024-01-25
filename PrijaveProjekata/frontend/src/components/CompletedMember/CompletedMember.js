import React, { useEffect, useState } from "react";
import './CompletedMember.css'


const CompletedMember = ({fullName, email, percent}) => {
    
    const[nameSurname, setNameSurname] = useState('');
    const[eMail, setEMail] = useState('');
    const[percentage, setPercentage] = useState('');

    useEffect(() => {
        setNameSurname(fullName);
        setEMail(email);
        setPercentage(percent);
    }, [])

    return (
        <div id="completed-member-container">
            <span className="completed-member-data-element" value={nameSurname}>{nameSurname}</span>
            <span className="comleted-member-data" value={eMail}>{eMail}</span>
            <span className="comleted-member-data" value={percentage}>{percentage}</span>
        </div>
      );
}
 
export default CompletedMember;