import React from "react";
import "./AdminDashboard.css"
import ProjectInfoButtonContainer from "./ProjectInfoButtonContainer/ProjectInfoButtonContainer";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import { useState, useEffect } from "react";
import AdminDashboardHeader from "./AdminDashboardHeader/AdminDashboardHeader";
import { AdminDashboardContext } from "./context/AdminDashboardContext";

// external components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


const AdminDashboard = () => {
    
    const [projectSets, setProjectSets] = useState(null)

    // forms that hold form's data
    // each one holds project applications
    const [intentionForms, setIntentionForms] = useState(null)
    const [approvalForms, setApprovalForms] = useState(null)

    const [selectedIntentionFormId, setSelectedIntentionFormId] = useState("")
    const [selectedApprovalFormId, setSelectedApprovalFormId] = useState("")

    const [intentionSelection, setIntentionSelection] = useState(false)
    const [approvalSelection, setApprovalSelection] = useState(false)

    // selected project inside second section 
    // project is part of one of the groups -> either OBRASCI NAMJERE or TRAŽENJE SUGLASNOSTI
    const [selectedProject, setSelectedProject] = useState()

    // AdminContext

    // project editable
    const [projectEditable, setProjectEditable] = useState(false);

    const handleEditable = () => {
        setProjectEditable(!projectEditable);
    }
    
    // while component mounts
    useEffect(() => {
        // fetch data
        const fetchData = async () => {
            try {
                const response = await fetch('/api/projectInfo');
                
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // load response into data
                const data = await response.json();

                // load all data into projectSets
                setProjectSets(data);
                
                // filters response depending on marker - firstInputMarker - intentionForm
                // filters each item of data depending on marker 
                // -> if first marker equals true, then it's an intention form
                // -> if both markers equal true, then it's an approval form
                // seting up setIntentionForms and setApprovalForms state
                setIntentionForms(data.filter(item => item.firstInputMarker === true && item.secondInputMarker === false));

                // filters response depending on marker - secondInputMarker - approvalForm
                setApprovalForms(data.filter(item => item.firstInputMarker === true && item.secondInputMarker === true));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    // if selectedIntentionFormId changes
    useEffect(() => {
        if(intentionForms){
            setSelectedProject(intentionForms.find((element) => element._id == selectedIntentionFormId))
        }
    }, [selectedIntentionFormId])

    // if selectedApprovalFormId changes
    useEffect(() => {
        if(approvalForms){
            setSelectedProject(approvalForms.find((element) => element._id == selectedApprovalFormId))
        }
    }, [selectedApprovalFormId])

    // button OBRASCI NAMJERE clickes
    const handleClickIntention = () => {
        setIntentionSelection(true)
        setApprovalSelection(false)
    }

    // button TRAŽENJE SUGLASNOSTI clicked
    const handleClickApproval = () => {
        setApprovalSelection(true)
        setIntentionSelection(false)
    }

    return(
        <>
        <AdminDashboardContext.Provider value={{projectEditable, setProjectEditable}}>
            <div className="admin-dashboard-container">
                
                <AdminDashboardHeader/>

                <div className="admin-dashboard">

                    {/* FIRST SECTION */}
                    <div className="type-of-project-applications-section">
                        <h5 className="section-title">Pretraga projekata</h5>
                        {/* part that holds  */}
                        <div className="type-of-project-applications-container">
                            <button className={`${intentionSelection ? 'project-type-form-button-selected' : 'project-type-form-button'}`} onClick={handleClickIntention}><span>Obrasci namjere</span></button>

                            <button className={`${approvalSelection ? 'project-type-form-button-selected' : 'project-type-form-button'}`} onClick={handleClickApproval}><span>Traženje suglasnosti</span></button>
                        </div>
                    </div>

                    {/* SECOND SECTION */}
                    <div className="project-applications-container">
                        {/* if intentionSelection == true => show INTENTION FORMS*/}
                        {intentionSelection && <ProjectInfoButtonContainer projectInfoSets={intentionForms} selectProject={setSelectedIntentionFormId}/>}
                        {approvalSelection && <ProjectInfoButtonContainer projectInfoSets={approvalForms} selectProject={setSelectedApprovalFormId}/>}
                    </div>

                    {/* THIRD SECTION */}

                        {/* if selectedProject exists => show selected project's info */}
                    <div className="single-application-container">
                        <div className="edit-button-container" onClick={handleEditable}> 
                            <FontAwesomeIcon icon={faPencilAlt} style={{color: "#FDF9F9"}} />
                            <div className="edit-button" >{projectEditable ? "ZAVRŠI UREĐIVANJE" : "UREDI"}</div>
                        </div>
                        {selectedProject && <ProjectInfo selectedProject={selectedProject}/>}
                    </div>

                </div>

            </div>
            </AdminDashboardContext.Provider>
        </>
    )
}

export default AdminDashboard