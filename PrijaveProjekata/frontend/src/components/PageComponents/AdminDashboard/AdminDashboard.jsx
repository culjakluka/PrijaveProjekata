import React from "react";
import "./AdminDashboard.css";
import { useState, useEffect } from "react";

// context
import { AdminDashboardContext } from "../../../context/AdminDashboardContext.js";

// my components
import ModalSettings from "./AdminDashboardComponents/ModalSettings/ModalSettings.js";
import ModalUpdateProjectInfo from "./AdminDashboardComponents/ModalUpdateProjectInfo/ModalUpdateProjectInfo.js";
import AdminDashboardHeader from "./AdminDashboardHeader/AdminDashboardHeader";
import ProjectInfo from "./AdminDashboardComponents/ProjectInfo/ProjectInfo";
import ProjectInfoButtonContainer from "./AdminDashboardComponents/ProjectInfoButtonContainer/ProjectInfoButtonContainer";

// external components

// FontAwesome 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faFilePdf, faDownload } from "@fortawesome/free-solid-svg-icons";

// api requests
import {
  approveFirstFormSubmit,
  approveSecondFormSubmit,
  submitFirstForm,
  submitSecondForm,
  rejectProject,
  deleteProject,
  adminUpdateProjectInfoSet,
} from "./ApiRequests.js";

// pdf components
import FirstInputFormPDF from "../../InputComponents/PDF/FirstInputFormPDF.js";
import { pdf } from "@react-pdf/renderer";
import { firstInputFormData } from '../../InputComponents/PDF/data.js'

const AdminDashboard = () => {
  const [projectSets, setProjectSets] = useState(null);

  // forms that hold form's data
  // each one holds project applications
  const [intentionForms, setIntentionForms] = useState(null);
  const [approvalForms, setApprovalForms] = useState(null);

  const [selectedIntentionFormId, setSelectedIntentionFormId] = useState("");
  const [selectedApprovalFormId, setSelectedApprovalFormId] = useState("");

  const [intentionSelection, setIntentionSelection] = useState(true);
  const [approvalSelection, setApprovalSelection] = useState(false);

  // selected project inside second section
  // project is part of one of the groups -> either OBRASCI NAMJERE or TRAŽENJE SUGLASNOSTI
  const [selectedProject, setSelectedProject] = useState();

  // pending, approved buttons
  const [pendingSelected, setPendingSelected] = useState(true);
  const [approvedSelected, setApprovedSelected] = useState(false);
  const [declinedSelected, setDeclinedSelected] = useState(false);

  const [pendingIntentionFormList, setPendingIntentionFormList] =
    useState(null);
  const [approvedIntentionFormList, setApprovedIntentionFormList] =
    useState(null);
  const [declinedIntentionFormList, setDeclinedIntentionFormList] =
    useState(null);

  const [pendingApprovalFormList, setPendingApprovalFormList] = useState(null);
  const [approvedApprovalFormList, setApprovedApprovalFormList] =
    useState(null);
  const [declinedApprovalFormList, setDeclinedApprovalFormList] =
    useState(null);

  // modal - settings
  const [modalSettingsIsOpen, setModalSettingsIsOpen] = useState(false);

  // modal - update project info
  const [modalUpdateProjectInfoIsOpen, setModalUpdateProjectInfoIsOpen] =
    useState(false);

  // project editable
  const [projectEditable, setProjectEditable] = useState(false);

  const [updateProjectData, setUpdateProjectData] = useState({});

  const [selectedProjectId, setSelectedProjectId] = useState("");

  // data used to generate PDF out of selected project
  const [formattedData, setFormattedData] = useState(firstInputFormData);
  // USE EFFECT

  // after component is mounted
  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("/api/projectInfo");

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
        setIntentionForms(
          data.filter(
            (item) =>
              item.firstInputMarker === true && item.secondInputMarker === false
          )
        );

        // filters response depending on marker - secondInputMarker - approvalForm
        setApprovalForms(
          data.filter(
            (item) =>
              item.firstInputMarker === true && item.secondInputMarker === true
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // if selectedIntentionFormId changes
  useEffect(() => {
    if (intentionForms) {
      setSelectedProject(
        intentionForms.find((element) => element._id == selectedIntentionFormId)
      );
    }
  }, [selectedIntentionFormId]);

  // if selectedApprovalFormId changes
  useEffect(() => {
    if (approvalForms) {
      setSelectedProject(
        approvalForms.find((element) => element._id == selectedApprovalFormId)
      );
    }
  }, [selectedApprovalFormId]);

  // when INTENTION FORMS changes
  // filter them by state
  useEffect(() => {
    // OBRASCI NAMJERE
    setPendingIntentionFormList(
      intentionForms?.filter((item) => item.state === "firstFormSubmitted")
    );
    setApprovedIntentionFormList(
      intentionForms?.filter((item) => item.state === "firstFormApproved")
    );
    setDeclinedIntentionFormList(
      intentionForms?.filter((item) => item.state === "projectRejected")
    );
  }, [intentionForms]);

  // when APPROVAL FORMS change
  // filter them by state
  useEffect(() => {
    // TRAŽENJE SUGLASNOSTI
    setPendingApprovalFormList(
      approvalForms?.filter((item) => item.state === "secondFormSubmitted")
    );
    setApprovedApprovalFormList(
      approvalForms?.filter((item) => item.state === "secondFormApproved")
    );
    setDeclinedApprovalFormList(
      approvalForms?.filter((item) => item.state === "projectRejected")
    );
  }, [approvalForms]);

  // when selectedProject changes,
  // fill project's data into formattedData
  // which will be used to generate PDF
  useEffect(() => { 
    console.log(selectedProject);

    formattedData[0].elements[0].value = JSON.stringify(selectedProject?.nameSurname);
    formattedData[0].elements[1].value = JSON.stringify(selectedProject?.vocation);
    formattedData[0].elements[2].value = JSON.stringify(selectedProject?.department);  
    formattedData[0].elements[3].value = JSON.stringify(selectedProject?.email);

    formattedData[1].elements[0].value = JSON.stringify(selectedProject?.projectTitle);
    formattedData[1].elements[1].value = JSON.stringify(selectedProject?.projectAcronym);
    formattedData[1].elements[2].value = JSON.stringify(selectedProject?.applicationDeadline);

    formattedData[2].elements[0].value = JSON.stringify(selectedProject?.projectSummary);

    formattedData[3].elements[0].value = JSON.stringify(selectedProject?.applicationURL);

    formattedData[4].elements[0].value = JSON.stringify(selectedProject?.projectApplicant);

    formattedData[5].elements[0].value = JSON.stringify(selectedProject?.projectPartners);

    formattedData[6].elements[0].value = JSON.stringify(selectedProject?.totalValue);
    formattedData[6].elements[1].value = JSON.stringify(selectedProject?.fesbValuePart);

    formattedData[7].elements[0].value = JSON.stringify(selectedProject?.newEmploymentBoolean);

  }, [selectedProject]);

  // FUNCTIONS

  const handleEditable = () => {
    setProjectEditable(!projectEditable);
  };

  const handlePending = () => {
    setPendingSelected(true);
    setApprovedSelected(false);
    setDeclinedSelected(false);
  };

  const handleApproved = () => {
    setApprovedSelected(true);
    setPendingSelected(false);
    setDeclinedSelected(false);
  };

  const handleDeclined = () => {
    setApprovedSelected(false);
    setPendingSelected(false);
    setDeclinedSelected(true);
  };

  // button OBRASCI NAMJERE clickes
  const handleClickIntention = () => {
    setIntentionSelection(true);
    setApprovalSelection(false);
  };

  // button TRAŽENJE SUGLASNOSTI clicked
  const handleClickApproval = () => {
    setApprovalSelection(true);
    setIntentionSelection(false);
  };

  // handling PDF

  // handle pdf new tab
  const handlePDF = (projectData) => {
    // Generate the document
    const doc = <FirstInputFormPDF data={projectData} />;
  
    // Create a PDF blob
    pdf(doc).toBlob().then(blob => {
      // Create a Blob URL
      const url = URL.createObjectURL(blob);
  
      // Open the PDF in a new tab
      // _blank means it will open in a new tab
      window.open(url, '_blank');
  
      // Optional: Release the Blob URL to free up resources
      URL.revokeObjectURL(url);
    }).catch(err => {
      console.error(err);
    });

  }


  // TESTING START //

  const [projectId, setProjectId] = useState("");

  const handleProjectId = (event) => {
    setProjectId(event.target.value);
  };

  return (
    <>
      <AdminDashboardContext.Provider
        value={{
          projectEditable,
          setProjectEditable,
          modalSettingsIsOpen,
          setModalSettingsIsOpen,
          selectedProjectId,
          setSelectedProjectId,
          intentionSelection,
          approvalSelection,
          handleEditable,
          modalUpdateProjectInfoIsOpen,
          setModalUpdateProjectInfoIsOpen,
          updateProjectData,
          setUpdateProjectData,
          selectedProject,
        }}
      >
        <div className="admin-dashboard-container">
          {/* MODAL COMPONENTS */}
          {modalSettingsIsOpen && <ModalSettings />}

          {modalUpdateProjectInfoIsOpen && <ModalUpdateProjectInfo />}

          <AdminDashboardHeader />

          <div className="admin-dashboard">
            {/* FIRST SECTION */}
            <div className="type-of-project-applications-section">
              <h5 className="section-title">Pretraga projekata</h5>
              {/* part that holds  */}
              <div className="type-of-project-applications-container">
                <button
                  className={`${intentionSelection ? "project-type-form-button-selected" : "project-type-form-button"}`}
                  onClick={handleClickIntention}
                >
                  <span>Obrasci namjere ({intentionForms?.length})</span>
                </button>

                <button
                  className={`${approvalSelection ? "project-type-form-button-selected" : "project-type-form-button"}`}
                  onClick={handleClickApproval}
                >
                  <span>Traženje suglasnosti ({approvalForms?.length})</span>
                </button>
              </div>

              {/* // TESTING START // */}
              <span
                style={{
                  marginTop: "50px",
                  marginLeft: "100px",
                  marginRight: "100px",
                  alignSelf: "center",
                }}
              >
                TESTING
              </span>
              <input
                placeholder="enter id to delete it..."
                value={projectId}
                onChange={handleProjectId}
                style={{ marginLeft: "100px", marginRight: "100px" }}
              ></input>

              {/* projecId is taken from a state initialized in testing section above */}
              <button
                onClick={() => deleteProject(projectId)}
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                DELETE
              </button>
              <button
                onClick={() => approveFirstFormSubmit(projectId)}
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                APPROVE FIRST
              </button>
              <button
                onClick={() => approveSecondFormSubmit(projectId)}
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                APPROVE SECOND
              </button>
              <button
                onClick={() => rejectProject(projectId)}
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                DECLINE PROJECT
              </button>
              <button
                onClick={() => submitFirstForm(projectId)}
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                SUBMIT FIRST
              </button>
              <button
                onClick={() => submitSecondForm(projectId)}
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                SUBMIT SECOND
              </button>
              <div
                style={{
                  marginTop: "100px",
                  marginLeft: "100px",
                  marginLeft: "100px",
                }}
              >
                UPDATE PROJECT DATA:{JSON.stringify(updateProjectData)}
              </div>

              {/* // TESTING END // */}
            </div>

            {/* SECOND SECTION */}
            <div className="project-applications-container">
              {/* PENDIND, APPROVED AND DECLINED FILTER*/}
              <div className="progress-container">
                <button
                  onClick={handlePending}
                  className={
                    pendingSelected
                      ? "pending-button-selected"
                      : "pending-button-hidden"
                  }
                >
                  U TIJEKU (
                  {intentionSelection
                    ? pendingIntentionFormList?.length
                    : pendingApprovalFormList?.length}
                  )
                </button>
                <button
                  onClick={handleApproved}
                  className={
                    approvedSelected
                      ? "approved-button-selected"
                      : "approved-button-hidden"
                  }
                >
                  ODOBRENO (
                  {intentionSelection
                    ? approvedIntentionFormList?.length
                    : approvedApprovalFormList?.length}
                  )
                </button>
                <button
                  onClick={handleDeclined}
                  className={
                    declinedSelected
                      ? "declined-button-selected"
                      : "declined-button-hidden"
                  }
                >
                  ODBIJENO (
                  {intentionSelection
                    ? declinedIntentionFormList?.length
                    : declinedApprovalFormList?.length}
                  )
                </button>
              </div>

              {/* OBRASCI NAMJERE */}
              {intentionSelection && pendingSelected && (
                <ProjectInfoButtonContainer
                  projectInfoSets={pendingIntentionFormList}
                  selectProject={setSelectedIntentionFormId}
                />
              )}
              {intentionSelection && approvedSelected && (
                <ProjectInfoButtonContainer
                  projectInfoSets={approvedIntentionFormList}
                  selectProject={setSelectedIntentionFormId}
                />
              )}
              {intentionSelection && declinedSelected && (
                <ProjectInfoButtonContainer
                  projectInfoSets={declinedIntentionFormList}
                  selectProject={setSelectedIntentionFormId}
                />
              )}

              {/* TRAŽENJE SUGLASNOSTI */}
              {approvalSelection && pendingSelected && (
                <ProjectInfoButtonContainer
                  projectInfoSets={pendingApprovalFormList}
                  selectProject={setSelectedApprovalFormId}
                />
              )}
              {approvalSelection && approvedSelected && (
                <ProjectInfoButtonContainer
                  projectInfoSets={approvedApprovalFormList}
                  selectProject={setSelectedApprovalFormId}
                />
              )}
              {approvalSelection && declinedSelected && (
                <ProjectInfoButtonContainer
                  projectInfoSets={declinedApprovalFormList}
                  selectProject={setSelectedApprovalFormId}
                />
              )}

            </div>

            {/* THIRD SECTION */}
                    
            {/* if selectedProject exists => show selected project's info */}
            <div className="single-application-container">
              {selectedProject != null &&
                pendingSelected /*to prevent rendering if the project is not selected*/ && (
                  <div className="manage-project-container">
                    <div
                      className="edit-button-container manage-button-style"
                      onClick={
                        !projectEditable
                          ? () => setProjectEditable(true)
                          : () => setModalUpdateProjectInfoIsOpen(true)
                      }
                    >
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        style={{ color: "#FDF9F9" }}
                      />
                      <button className="edit-button">
                        {projectEditable ? "ZAVRŠI UREĐIVANJE" : "UREDI"}
                      </button>
                    </div>

                    <div className="decision-buttons-container">
                      <div className="approve-button-container manage-button-style">
                        <button
                          onClick={
                            intentionSelection
                              ? () =>
                                  approveFirstFormSubmit(selectedProject._id)
                              : () =>
                                  approveSecondFormSubmit(selectedProject._id)
                          }
                          className="approve-button"
                        >
                          ODOBRI
                        </button>
                      </div>

                      <div className="decline-button-container manage-button-style">
                        <button
                          onClick={() => rejectProject(selectedProject._id)}
                          className="decline-button"
                        >
                          ODBIJ
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              

              {selectedProject && (
                <>
                {/* PDF SECTION */}
                <div class="project-to-pdf-container">
                  <p>Dohvati projekt u obliku pdf dokumenta:</p>
                  <button onClick={() => handlePDF(formattedData)} class="project-to-pdf-button">
                    <div class="project-to-pdf-txt">PREUZMI</div>
                    <FontAwesomeIcon icon={faDownload} style={{color: "#ffffff"}}/>
                  </button>
                </div>
                {/* PDF SECTION END */}
                <ProjectInfo selectedProject={selectedProject} />
                </>
              )}
            </div>
          </div>
        </div>
      </AdminDashboardContext.Provider>
    </>
  );
};

export default AdminDashboard;
