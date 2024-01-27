import react, { useEffect, useState } from 'react'
import '../SpecialInput.css'
import SpecialInputProjectContainer from '../SpecialInputProjectContainer/SpecialInputProjectContainer';
import CompletedProject from '../../CompletedProject/CompletedProject';


const SpecialInputMember = ({addProjectMember}) => {

    const[newItemNameSurname, setNewItemNameSurname] = useState("");
    const[newItemEmail, setNewItemEmail] = useState("");
    const[newItemPercentage, setNewItemPercentage] = useState("");
    const[member, setMember]=useState({});
    // member's projects that are going to be dynamically added by 
    const[projects, setProjects] = useState([]);

    // when any of those items changes - newItemNameSurname, newItemEmail, newItemPercentage - memeber updates
    useEffect(() => {
        setMember({
            newItemNameSurname,
            newItemEmail,
            newItemPercentage,
            projects
        })      
        // console.log(member)
    }, [newItemNameSurname, newItemEmail, newItemPercentage, projects])

    // member is sent somewhere
    // addNewMember - function that is located in this component, used only to trigger
    // function addProjectMember that came here as a prop
    const addNewMember = () => {
        addProjectMember(member);
        // console.log("MEMBER.PROJECTS" + member)
    }

    // function used to add new project
    const addNewProject = (newProject) => {
        setProjects((previousMembers) => [...previousMembers, newProject]);
        // console.log("SpecialIputMember projects:\n")
        // console.log("OVO SU SVI PROJEKTI"+projects);
    }

    return (  
        <div>
            <div id="special-input-member-info">
                <input className="special-input-input" placeholder="ime i prezime..." onChange={(e) => setNewItemNameSurname(e.target.value)}></input>
                <input className="special-input-input" placeholder="e-mail..." onChange={(e) => setNewItemEmail(e.target.value)}></input>
                <input className="special-input-input" placeholder="postotak..." onChange={(e) => setNewItemPercentage(e.target.value)}></input>
                

                <p id="special-input-member-projects-title">MEMBER'S OTHER PROJECTS:</p>

                <div id="special-input-member-projects-list">
                    {projects && projects.map((component, index) => (
                        <CompletedProject key={index} name={component.name} percentage={component.percentage}/>
                    ))}
                </div>

                <SpecialInputProjectContainer addNewProjectProp={addNewProject}/> 

                <button onClick={addNewMember}>ADD MEMBER</button>
            </div>

        </div>
    );
}
 
export default SpecialInputMember;