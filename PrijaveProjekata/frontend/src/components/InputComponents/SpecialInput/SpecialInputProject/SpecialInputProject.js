import react, { useEffect, useState } from 'react'
import '../SpecialInput.css'

const SpecialInputProject = ({addNewProjectProp}) => {
    const[otherProjectName, setOtherProjectName] = useState('');
    const[otherProjectPercentage, setOtherProjectPercentage] = useState('');
    const[project, setProject] = useState({});

    useEffect(() => {
        setProject({
            otherProjectName,
            otherProjectPercentage
        }
        );
    }, [otherProjectName, otherProjectPercentage])

    const addNewProject = () => {
        addNewProjectProp(project)
    }

    return (
        <div id="special-input-member-projects-project">
            <input 
                value={otherProjectName}
                className="special-input-input"
                placeholder="naziv projekta..."
                onChange={(e) => setOtherProjectName(e.target.value)}
            />
            <input
                value={otherProjectPercentage}
                className="special-input-input"
                placeholder="postotak u projektu..."
                onChange={(e) => setOtherProjectPercentage(e.target.value)}
            />
            <button id="special-input-add-project" onClick={addNewProject}>ADD PROJECT</button>
        </div>
    );
}
 
export default SpecialInputProject;