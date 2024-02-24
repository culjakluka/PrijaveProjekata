import React, { useContext, useEffect, useState } from "react";
import '../SpecialInput/SpecialInput.css'
import { SpecialInputContext } from "../SpecialInput/SpecialInputContext";
import CompletedProject from "../../InputComponents/CompletedProject/CompletedProject";

const CompletedMember = ({memberIndex, fullName, email, percent, projectsArray, deleteSingleMember}) => {
    
    const[nameSurname, setNameSurname] = useState('');
    const[eMail, setEMail] = useState('');
    const[percentage, setPercentage] = useState('');
    const[projects, setProjects] = useState([])
    const[memberId, setMemberId] = useState("");

    const { projectMembers, setProjectMembers } = useContext(SpecialInputContext); 

    useEffect(() => {
        setNameSurname(fullName);
        setEMail(email);
        setPercentage(percent);
        setProjects(projectsArray);
        setMemberId(memberIndex);
    }, [fullName, email, percent, projects])

    const handleDeleteMember = () => {
        deleteSingleMember(memberId)
    }

    return (
        <div id="completed-member-container">
            <div id="completed-member-personal-details">
                <span className="completed-member-data" >{nameSurname}</span>
                <span className="completed-member-data" >{eMail}</span>
                <span className="completed-member-data" >{percentage}</span>
            </div>
            <div id="completed-member-projects">
                {projects.length > 0 ? projects.map((project, index) => {
                    return <CompletedProject key={index} name={project.otherProjectName} percentage={project.otherProjectPercentage}/>
                }) : <p> No projects for this member </p>}
            </div>

            <button onClick={handleDeleteMember}>delete member</button>
        </div>
      );
}
 
export default CompletedMember;