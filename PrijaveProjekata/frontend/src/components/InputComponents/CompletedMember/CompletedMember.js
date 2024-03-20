import React, { useContext, useEffect, useState } from "react";
import Style from '../SpecialInput/SpecialInputSecondInputForm.module.css';
import { SpecialInputContext } from "../SpecialInput/SpecialInputContext";
import CompletedProject from "../../InputComponents/CompletedProject/CompletedProject";

const CompletedMember = ({ memberIndex, fullName, email, percent, projectsArray, deleteSingleMember }) => {

    const [nameSurname, setNameSurname] = useState('');
    const [eMail, setEMail] = useState('');
    const [percentage, setPercentage] = useState('');
    const [projects, setProjects] = useState([])
    const [memberId, setMemberId] = useState("");

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
        <div id={Style.CompletedMemberContainer}>
            <div id={Style.CompletedMemberData}>
                <span className={Style.CompletedMemberData}>{nameSurname}</span>
                <span className={Style.CompletedMemberData}>{eMail}</span>
                <span className={Style.CompletedMemberData}>{percentage}</span>
            </div>
            <div id={Style.completedMemberProjects}>
                {projects.length > 0 ? projects.map((project, index) => {
                    return <CompletedProject key={index} name={project.otherProjectName} percentage={project.otherProjectPercentage} />
                }) : <p> No projects for this member </p>}
            </div>

            <button onClick={handleDeleteMember}>delete member</button>
        </div>
    );
}

export default CompletedMember;
