import React, { useContext, useEffect, useState } from "react";
import "./ProjectInfoButton.css"
import { AdminDashboardContext } from "../../../../../context/AdminDashboardContext";

const ProjectInfoButton = ({projectInfo, selectProject}) => {

    const [isSelected, setIsSelected] = useState(false);

    const {selectedProjectId, setSelectedProjectId} = useContext(AdminDashboardContext);


    const handleClick = () => {
        selectProject(projectInfo._id)
        setSelectedProjectId(projectInfo._id)
        setIsSelected(true);
    }

    useEffect(() => {
        if(selectedProjectId == projectInfo._id) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [selectedProjectId])

    return (
        <>
            <button className={isSelected ? "project-info-button-is-selected" : "project-info-button"} onClick={handleClick} ><span>{projectInfo.nameSurname} - {projectInfo.projectAcronym} </span></button>
            </>
    )
}

export default ProjectInfoButton