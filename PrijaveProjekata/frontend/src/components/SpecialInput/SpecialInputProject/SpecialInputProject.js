import react, { useEffect, useState } from 'react'
import '../SpecialInput.css'

const SpecialInputProject = ({addNewProjectProp}) => {

    const[name, setName] = useState('');
    const[percentage, setPercentage] = useState('');
    const[project, setProject] = useState({});


    useEffect(() => {
        setProject({
            name,
            percentage
        }
        );
    }, [name, percentage])

    const addNewProject = () => {
        // console.log("NEW PROJECT ADDED: " + project.name + project.percentage)
        addNewProjectProp(project)
    }

    return (
        <div id="special-input-member-projects-project">
            <input value={name} className="special-input-input" placeholder="naziv projekta..." onChange={(e) => setName(e.target.value)}></input>
            <input value={percentage} className="special-input-input" placeholder="postotak u projektu..." onChange={(e) => setPercentage(e.target.value)}></input>
            <button onClick={addNewProject}>ADD PROJECT</button>
        </div>
    );
}
 
export default SpecialInputProject;