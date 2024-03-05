import React, { useState, useEffect } from "react";
import Style from '../SpecialInput/SpecialInputSecondInputForm.module.css';

const CompletedProject = ({ name, percentage }) => {

    const [projectName, setProjectName] = useState('');
    const [projectPercentage, setProjectPercentage] = useState('');

    // after component mounts, load data from props into 
    useEffect(() => {
        setProjectName(name);
        setProjectPercentage(percentage);
    }, [name, percentage])

    return (
        <div id={Style.completedProjectContainer}>
            <span className={Style.completedProjectMemberData}>{projectName}</span>
            <span className={Style.completedProjectMemberData}>{projectPercentage}</span>
        </div>
    );
}

export default CompletedProject;
