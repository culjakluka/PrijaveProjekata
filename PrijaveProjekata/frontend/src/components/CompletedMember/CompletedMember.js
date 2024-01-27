import React, { useEffect, useState } from "react";
import './CompletedMember.css'


const CompletedMember = ({fullName, email, percent, projects}) => {
    
    const[nameSurname, setNameSurname] = useState('');
    const[eMail, setEMail] = useState('');
    const[percentage, setPercentage] = useState('');
    const[projectArray, setProjectArray] = useState([])

    useEffect(() => {
        setNameSurname(fullName);
        setEMail(email);
        setPercentage(percent);
        setProjectArray(projects)
    }, [fullName, email, percent, projects])


    return (
        <div id="completed-member-container">
            <span className="completed-member-data" >{nameSurname}</span>
            <span className="completed-member-data" >{eMail}</span>
            <span className="completed-member-data" >{percentage}</span>
            {projectArray && projectArray.map((project, index) => {
                return <span key={index} className="completed-member-data" > {project.name} : {project.percentage}</span>
            })}
        </div>
      );
}
 
export default CompletedMember;