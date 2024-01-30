import React from "react";
import styles from "./AdminDashboard.module.css"
import ProjectInfoButtonContainer from "../ProjectInfoButtonContainer/ProjectInfoButtonContainer";
import ProjectInfo from "../ProjectInfo/ProjectInfo";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
    const [projectSets, setProjectSets] = useState(null)
    const [intentionForms, setIntentionForms] = useState(null)
    const [approvalForms, setApprovalForms] = useState(null)
    const [selectedIntentionFormId, setSelectedIntentionFormId] = useState("")
    const [selectedApprovalFormId, setSelectedApprovalFormId] = useState("")
    const [intentionSelection, setIntentionSelection] = useState(false)
    const [approvalSelection, setApprovalSelection] = useState(false)
    const [selectedIntentionForm, setSelectedIntentionForm] = useState()

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/projectInfo');
                
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setProjectSets(data);
                setIntentionForms(data.filter(item => item.firstInputMarker === true && item.secondInputMarker === false));
                setApprovalForms(data.filter(item => item.firstInputMarker === true && item.secondInputMarker === true));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if(intentionForms){
            setSelectedIntentionForm(intentionForms.find((element) => element._id == selectedIntentionFormId))
        }
    }, [selectedIntentionFormId])
    useEffect(() => {
        if(approvalForms){
            setSelectedIntentionForm(approvalForms.find((element) => element._id == selectedApprovalFormId))
        }
    }, [selectedApprovalFormId])

    const handleClickIntention = () => {
        setIntentionSelection(true)
        setApprovalSelection(false)
    }
    const handleClickApproval = () => {
        setApprovalSelection(true)
        setIntentionSelection(false)
    }

    return(
        <>
            <div className={styles.AdminDashboardContainer}>
                <div className={styles.NavbarContainer}>
                    <h5>Pretraga projekata</h5>
                    <div className="IntentionFormSelection">
                        <button onClick={handleClickIntention}><span>Obrasci namjere</span></button>
                    </div>
                    <div className="ApprovalFormSelection">
                        <button onClick={handleClickApproval}><span>Traženje suglasnosti</span></button>
                    </div>
                </div>
                <div className={styles.ExplorerContainer}>
                    {intentionSelection && <ProjectInfoButtonContainer projectInfoSets={intentionForms} selectProject={setSelectedIntentionFormId}/>}
                    {approvalSelection && <ProjectInfoButtonContainer projectInfoSets={approvalForms} selectProject={setSelectedApprovalFormId}/>}
                </div>
                <div className={styles.InfoContainer}>
                    {selectedIntentionForm && <ProjectInfo selectedProject={selectedIntentionForm}/>}
                </div>
            </div>
        </>
    )
}

export default AdminDashboard