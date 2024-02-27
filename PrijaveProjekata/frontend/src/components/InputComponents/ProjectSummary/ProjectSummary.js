import {useState, React} from 'react'
import Style from './ProjectSummary.module.css'

const ProjectSummary = (name, initialValue) => {

    const[projectSummary, setProjectSummary] = useState("");

    const hanldeInput = (event) => {
        setProjectSummary(event.target.value);
    }

    return (  
        <div className={Style.ProjectSummaryContainer}>
            <input type="text" onChange={hanldeInput} placeholder="opis projekta..." className={Style.ProjectSummaryInput}></input>
        </div>
    );
}
 
export default ProjectSummary;