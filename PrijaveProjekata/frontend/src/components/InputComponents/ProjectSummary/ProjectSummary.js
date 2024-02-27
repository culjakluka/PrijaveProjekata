import {useState, React, useEffect} from 'react'
import Style from './ProjectSummary.module.css'

const ProjectSummary = ({name, initialValue}) => {

    const[projectSummary, setProjectSummary] = useState(initialValue);

    const handleInput = (event) => {
        const newValue = event.target.value
        setProjectSummary(newValue);
        sessionStorage.setItem(name, newValue)
    }

    useEffect(() => {
        const savedValue = sessionStorage.getItem(name);

        // if value is available in sessionStorage load it
        if(savedValue) {
            setProjectSummary(savedValue);
        }

    }, [])



    return (  
        <div className={Style.ProjectSummaryContainer}>
            <input type="text" onChange={handleInput} value={projectSummary} placeholder="opis projekta..." className={Style.ProjectSummaryInput}></input>
        </div>
    );
}
 
export default ProjectSummary;