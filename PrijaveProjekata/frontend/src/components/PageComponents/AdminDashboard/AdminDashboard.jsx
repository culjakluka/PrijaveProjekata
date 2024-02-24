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

    const [intentionSelection, setIntentionSelection] = useState(true)
    const [approvalSelection, setApprovalSelection] = useState(false)

    // selected project inside second section 
    // project is part of one of the groups -> either OBRASCI NAMJERE or TRAŽENJE SUGLASNOSTI
    const [selectedProject, setSelectedProject] = useState()

    // AdminContext
    
    /////////////////////////////////////////////////////////////////// POČETAK

    // project editable
    const [projectEditable, setProjectEditable] = useState(false);

    const handleEditable = () => {
        setProjectEditable(!projectEditable);
    }


    // pending, approved buttons
    const [pendingSelected, setPendingSelected] = useState(true);
    const [approvedSelected, setApprovedSelected] = useState(false);
    const [declinedSelected, setDeclinedSelected] = useState(false);

    const[pendingIntentionFormList, setPendingIntentionFormList] = useState(null);
    const[approvedIntentionFormList, setApprovedIntentionFormList] = useState(null);
    const[declinedIntentionFormList, setDeclinedIntentionFormList] = useState(null);

    const[pendingApprovalFormList, setPendingApprovalFormList] = useState(null);
    const[approvedApprovalFormList, setApprovedApprovalFormList] = useState(null);
    const[declinedApprovalFormList, setDeclinedApprovalFormList] = useState(null);

    useEffect(() => {
        // OBRASCI NAMJERE
        setPendingIntentionFormList(intentionForms?.filter(item => item.state === "firstFormSubmitted"));
        setApprovedIntentionFormList(intentionForms?.filter(item => item.state === "firstFormApproved"));
        setDeclinedIntentionFormList(intentionForms?.filter(item => item.state === "projectRejected"));

        // TRAŽENJE SUGLASNOSTI
        setPendingApprovalFormList(approvalForms?.filter(item => item.state === "secondFormSubmitted"));
        setApprovedApprovalFormList(approvalForms?.filter(item => item.state === "secondFormApproved"));
        setDeclinedApprovalFormList(approvalForms?.filter(item => item.state === "projectRejected"));
        
    }, [intentionForms])

    const handlePending = () => {
        setPendingSelected(true);
        setApprovedSelected(false);
        setDeclinedSelected(false);
    }

    const handleApproved = () => {
        setApprovedSelected(true);
        setPendingSelected(false);
        setDeclinedSelected(false);
    }

    const handleDeclined = () => {
        setApprovedSelected(false);
        setPendingSelected(false)
        setDeclinedSelected(true);
    }

    // odobri first formu
    const approveFirstFormSubmit = async (projectId) => {
        try {
            // Make a PATCH request to the backend API using fetch
            const response = await fetch(`/api/projectInfo/approveFirstFormSubmit/${projectId}`, {
                method: 'PATCH'
            });
    
            // Parse the JSON response
            const responseData = await response.json();
    
            // Handle the response as needed
            console.log(responseData); // Log the response data
    
        } catch (error) {
            console.error('Error approving first form submit:', error);
            // Handle errors as needed
        }
    };

    // odobri second formu
    const approveSecondFormSubmit = async (projectId) => {

    }

    ///////////////////////////////////////////////////////////////////// KRAJ


    // after component is mounted
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

                ////////////////////////////////////////////////////////////////////////
                // checking state and that way filling the list with corresponding elements
                setPendingIntentionFormList(intentionForms.filter(item => item.state === "firstFormSubmitted"));

                setApprovedIntentionFormList(intentionForms?.filter(item => item.state === "firstFormApproved"));

                setPendingApprovalFormList(approvalForms?.filter(item => item.state === "secondFormSubmitted"));

                setApprovedApprovalFormList(approvalForms?.filter(item => item.state === "secondFormApproved"));
                /////////////////////////////////////////////////////////////////////////

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
                            <button className={`${intentionSelection ? 'project-type-form-button-selected' : 'project-type-form-button'}`} onClick={handleClickIntention}><span>Obrasci namjere ({intentionForms?.length})</span></button>

                            <button className={`${approvalSelection ? 'project-type-form-button-selected' : 'project-type-form-button'}`} onClick={handleClickApproval}><span>Traženje suglasnosti ({approvalForms?.length})</span></button>
                        </div>
                    </div>

                    {/* SECOND SECTION */}
                    <div className="project-applications-container">
                        {/* PENDIND, APPROVED AND DECLINED FILTER*/}
                        <div className="progress-container">
                            <button onClick={handlePending} className= { pendingSelected ? "pending-button-selected" : "pending-button-hidden" }>PENDING     ({intentionSelection ? pendingIntentionFormList?.length :  pendingApprovalFormList?.length})</button>
                            <button onClick={handleApproved} className={ approvedSelected ? "approved-button-selected" : "approved-button-hidden" }>APPROVED  ({intentionSelection ? approvedIntentionFormList?.length : approvedApprovalFormList?.length})</button>
                            <button onClick={handleDeclined} className={ declinedSelected ? "declined-button-selected" : "declined-button-hidden" }>DECLINED  ({intentionSelection ? declinedIntentionFormList?.length : declinedApprovalFormList?.length})</button>
                        </div>

                        {/* OBRASCI NAMJERE */}
                        {intentionSelection && pendingSelected && <ProjectInfoButtonContainer projectInfoSets={pendingIntentionFormList} selectProject={setSelectedIntentionFormId}/>}
                        {intentionSelection && approvedSelected && <ProjectInfoButtonContainer projectInfoSets={approvedIntentionFormList} selectProject={setSelectedIntentionFormId}/>}
                        {intentionSelection && declinedSelected && <ProjectInfoButtonContainer projectInfoSets={declinedIntentionFormList} selectProject={setSelectedIntentionFormId}/>}
                       
                       {/* TRAŽENJE SUGLASNOSTI */}
                        {approvalSelection && pendingSelected && <ProjectInfoButtonContainer projectInfoSets={pendingApprovalFormList} selectProject={setSelectedIntentionFormId}/>}
                        {approvalSelection && approvedSelected && <ProjectInfoButtonContainer projectInfoSets={approvedApprovalFormList} selectProject={setSelectedIntentionFormId}/>}
                        {approvalSelection && declinedSelected && <ProjectInfoButtonContainer projectInfoSets={declinedApprovalFormList} selectProject={setSelectedIntentionFormId}/>}

                        {approvalSelection && <ProjectInfoButtonContainer projectInfoSets={approvalForms} selectProject={setSelectedApprovalFormId}/>}
                    </div>

                    {/* THIRD SECTION */}

                        {/* if selectedProject exists => show selected project's info */}
                    <div className="single-application-container">
                        {selectedProject != null && pendingSelected && /*to prevent rendering if the project is not selected*/
                            <div className="manage-project-container">
                                <div className="edit-button-container manage-button-style" onClick={handleEditable}> 
                                    <FontAwesomeIcon icon={faPencilAlt} style={{color: "#FDF9F9"}} />
                                    <button className="edit-button" >{projectEditable ? "ZAVRŠI UREĐIVANJE" : "UREDI"}</button>
                                </div>
                                <div className="decision-buttons-container">
                                    <div className="approve-button-container manage-button-style">
                                        <button onClick={() => approveFirstFormSubmit(selectedProject._id)} className="approve-button">APPROVE</button>
                                    </div>

                                    <div className="decline-button-container manage-button-style">
                                        <button className="decline-button">DECLINE</button>
                                    </div>
                                </div>
                            </div>
                        }
                        {selectedProject && <ProjectInfo selectedProject={selectedProject}/>}
                    </div>

                </div>

            </div>
            </AdminDashboardContext.Provider>
        </>
    )
}

export default AdminDashboard