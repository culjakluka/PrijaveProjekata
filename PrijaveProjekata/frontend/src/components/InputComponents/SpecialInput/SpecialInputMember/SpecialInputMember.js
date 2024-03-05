import React, { useEffect, useState } from 'react';
import SpecialInputProjectContainer from '../SpecialInputProjectContainer/SpecialInputProjectContainer';
import CompletedProject from '../../CompletedProject/CompletedProject';

// style
import Style from '../SpecialInputSecondInputForm.module.css';

const SpecialInputMember = ({ addProjectMember }) => {

    const [newItemNameSurname, setNewItemNameSurname] = useState("");
    const [newItemEmail, setNewItemEmail] = useState("");
    const [newItemPercentage, setNewItemPercentage] = useState("");
    const [member, setMember] = useState({});
    // member's projects that are going to be dynamically added by 
    const [otherProjects, setProjects] = useState([]);

    // when any of those items changes - newItemNameSurname, newItemEmail, newItemPercentage - memeber updates
    useEffect(() => {
        setMember({
            nameSurname: newItemNameSurname,
            email: newItemEmail,
            thisProjectPercentage: newItemPercentage,
            otherProjects
        })
    }, [newItemNameSurname, newItemEmail, newItemPercentage, otherProjects])

    // member is sent somewhere
    // addNewMember - function that is located in this component, used only to trigger
    // function addProjectMember that came here as a prop
    const addNewMember = () => {
        addProjectMember(member);
    }

    // function used to add new project
    const addNewProject = (newProject) => {
        setProjects((previousMembers) => [...previousMembers, newProject]);
    }

    return (
        <div>
            <div id={Style.SpecialInputMemberInfo}>
                <input
                    className={Style.SpecialInputInput}
                    placeholder="ime i prezime..."
                    onChange={(e) => setNewItemNameSurname(e.target.value)}
                />
                <input
                    className={Style.SpecialInputInput}
                    placeholder="e-mail..."
                    onChange={(e) => setNewItemEmail(e.target.value)}
                />
                <input
                    className={Style.SpecialInputInput}
                    placeholder="postotak..."
                    onChange={(e) => setNewItemPercentage(e.target.value)}
                />
                <p id={Style.SpecialInputMemberProjectsTitle}>OTHER PROJECTS:</p>
                <div id={Style.SpecialInputMemberProjectsList}>
                    {otherProjects.length > 0 ? otherProjects.map((component, index) => (
                        <CompletedProject key={index} name={component.otherProjectName} percentage={component.otherProjectPercentage} />
                    )) : <p>you didn't add any projects to this member...</p>}
                </div>
                <hr className={Style.SpecialSeparatorLine}></hr>
                <SpecialInputProjectContainer addNewProjectProp={addNewProject} />
                <button id={Style.SpecialInputAddMember} onClick={addNewMember}>ADD MEMBER</button>
            </div>

        </div>
    );
}

export default SpecialInputMember;
