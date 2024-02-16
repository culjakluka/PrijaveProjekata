import React, { useEffect, useState } from "react";
import '../SpecialInput/SpecialInput.css'


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
            <div id="completed-member-personal-details">
                <span className="completed-member-data" >{nameSurname}</span>
                <span className="completed-member-data" >{eMail}</span>
                <span className="completed-member-data" >{percentage}</span>
            </div>
            <div id="completed-member-projects">
                {projectArray.length > 0 ? projectArray.map((project, index) => {
                    return <span key={index} className="completed-member-project" > {project.otherProjectName} : {project.otherProjectPercentage}</span>
                }) : <p> No projects for this member </p>}
            </div>
        </div>
      );
}
 
export default CompletedMember;