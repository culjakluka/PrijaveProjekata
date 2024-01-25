import react, { useState } from 'react'
import '../SpecialInput.css'
import SpecialInputProject from '../SpecialInputProject/SpecialInputProject';
import { Button } from 'bootstrap';

const SpecialInputProjectContainer = () => {

const[projects, setProjects] = useState([]);

const addProject = (newProject) => {
    setProjects(...projects, newProject)
}

    return (  
        <div className='special-input-project-container'>
            <SpecialInputProject addNewProject={addProject}/>
            <button>+</button>
        </div>
    );
}
 
export default SpecialInputProjectContainer;