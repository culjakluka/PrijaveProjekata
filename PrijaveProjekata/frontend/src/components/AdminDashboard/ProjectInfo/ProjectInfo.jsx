import React, { useEffect, useState } from "react";
import styles from "./ProjectInfo.module.css"

// my components
import Question from '../../Question/Question.js'
import TextInput from '../../TextInput/TextInput.js'

const ProjectInfo = ({selectedProject}) => {
    const [isIntentionForm, setIsIntentionForm] = useState(true)
    const [selectedIntentionForm, setSelectedIntentionForm] = useState()

    // project data
    

    useEffect(() => {
        if(selectedProject.firstInputMarker && !selectedProject.firstInputMarker){
            setIsIntentionForm(true)
        }else if(selectedProject.firstInputMarker && selectedProject.firstInputMarker){
            setIsIntentionForm(false)
        }else{
            console.log("Error in passed project data in ProjectInfo component!")
        }
    }, [selectedProject])

    return(
        <>
            <div className={styles.ProjectInfo_Container}>
                <Question questionText={"1. Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a"}/>
               
                <span>{selectedProject.projectTitle}</span>
                <span>{selectedProject.nameSurname}</span>
                <span>{selectedProject.vocation}</span>
                <span>{selectedProject.department}</span>
                <span>{selectedProject.email}</span>
            </div>
        </>
    )
}

export default ProjectInfo