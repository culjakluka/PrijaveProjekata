import React from "react";
import styles from "./ProjectInfoButton.module.css"

const ProjectInfoButton = ({projectInfo, selectProject}) => {

    const handleClick = () => {
        selectProject(projectInfo._id)
    }
    return (
        <>
            <div className={styles.IntentionForm_Container}>
                <button onClick={handleClick} ><span>{projectInfo.projectTitle}</span></button>
            </div>
        </>
    )
}

export default ProjectInfoButton