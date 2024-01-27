import React from "react";
import styles from "./ProjectInfoButtonContainer.module.css"
import { useState, useEffect } from "react";
import ProjectInfoButton from "../ProjectInfoButton/ProjectInfoButton";

const ProjectInfoContainer = ({projectInfoSets, selectProject}) => {

    const [projectInfos, setProjectInfos] = useState([])

    useEffect(() => {
        setProjectInfos(projectInfoSets)    
    }, [projectInfoSets])

    return (
        <>
            {projectInfos?.map((projectInfo) => (
                <div>
                    <ProjectInfoButton className={styles.IntentionForm} key={projectInfo._id} projectInfo={projectInfo} selectProject={selectProject} />
                </div>
            ))}
        </>
    )
}

export default ProjectInfoContainer