import React, { useContext, useEffect, useState } from "react";
import "./ProjectInfoButton.css"
import { AdminDashboardContext } from "../../../../../context/AdminDashboardContext";

const ProjectInfoButton = ({projectInfo, selectProject}) => {

    const [isSelected, setIsSelected] = useState(false);

    const {
        selectedProjectId,
        setSelectedProjectId,
        editingInProgress,
        setModalUpdateProjectInfoIsOpen
    } = useContext(AdminDashboardContext);


    const handleClick = () => {
        // if editing in progress is false, then just select the project
        if(editingInProgress === false) {
            selectProject(projectInfo._id)
            setSelectedProjectId(projectInfo._id)
            setIsSelected(true);
        } 
        // if editing in progress is true and this is not selected project,
        // then, open dialog to ask if user wants to save changes of the current project
        else if(editingInProgress === true && isSelected === false) {
            setModalUpdateProjectInfoIsOpen(true);
        }
        
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