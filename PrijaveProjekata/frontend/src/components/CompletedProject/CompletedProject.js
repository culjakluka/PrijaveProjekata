import React, { useState, useEffect } from "react";
import '../SpecialInput/SpecialInput.css'

const CompletedProject = ({name, percentage}) => {

    const[projectName, setProjectName] = useState('');
    const[projectPercentage, setProjectPercentage] = useState('');

    // after component mounts, load data from props into 
    useEffect(() => {
        setProjectName(name);
        setProjectPercentage(percentage);
    }, [projectName, projectPercentage])

    

    return (  
        <div id="completed-project-container">
            <span className="completed-project-member-data">{projectName}</span>
            <span className="completed-project-member-data">{projectPercentage}</span>
        </div>
    );
}
 
export default CompletedProject;