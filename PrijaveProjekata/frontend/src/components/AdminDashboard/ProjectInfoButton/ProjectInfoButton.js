import React from "react";
import "./ProjectInfoButton.css"

const ProjectInfoButton = ({projectInfo, selectProject}) => {

    const handleClick = () => {
        selectProject(projectInfo._id)
    }
    return (
        <>
            <button className="project-info-button" onClick={handleClick} ><span>{projectInfo.projectTitle}</span></button>
        </>
    )
}

export default ProjectInfoButton