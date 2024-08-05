import React from "react";
import "./AdminDashboard.css";
import { useState, useEffect } from "react";

// context
import { AdminDashboardContext } from "../../../context/AdminDashboardContext.js";

// my components
import ModalSettings from "./AdminDashboardComponents/ModalSettings/ModalSettings.js";
import ModalUpdateProjectInfo from "./AdminDashboardComponents/ModalUpdateProjectInfo/ModalUpdateProjectInfo.js";
import ModalDiscardChanges from "./AdminDashboardComponents/ModalDiscardChanges/ModalDiscardChanges.js";
import ModalApproveProject from "./AdminDashboardComponents/ModalApproveProject/ModalApproveProject.js";
import ModalDeclineProject from "./AdminDashboardComponents/ModalDeclineProject/ModalDeclineProject.js";
import ModalMessage from "../../InputComponents/ModalMessage/ModalMessage.js";
import AdminDashboardHeader from "./AdminDashboardHeader/AdminDashboardHeader";
import ProjectInfo from "./AdminDashboardComponents/ProjectInfo/ProjectInfo";
import ProjectInfoButtonContainer from "./AdminDashboardComponents/ProjectInfoButtonContainer/ProjectInfoButtonContainer";
import LoadingSpinner from '../../InputComponents/LoadingSpinner/LoadingSpinner.js'

// external components

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faFilePdf,
  faDownload,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";

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
import {
  firstInputFormData,
  secondInputFormData,
} from "../../InputComponents/PDF/data.js";

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

  // modal - discard changes
  const [modalDiscardChangesIsOpen, setModalDiscardChangesIsOpen] =
    useState(false);

  // modal - approve project
  const [modalApproveProjectIsOpen, setModalApproveProjectIsOpen] =
    useState(false);

  // modal - decline project
  const [modalDeclineProjectIsOpen, setModalDeclineProjectIsOpen] =
    useState(false);

  // modal - message
  const [modalMessageIsOpen, setModalMessageIsOpen] = useState(false);
  const [messageForModal, setMessageForModal] = useState("Projekt uspješno odobren!");

  // loading spinner
  const [loadingSpinnerIsOpen, setLoadingSpinnerIsOpen] = useState(false)

  // project editable
  const [projectEditable, setProjectEditable] = useState(false);

  const [projectCopy, setProjectCopy] = useState({});

  const [updateProjectData, setUpdateProjectData] = useState({});

  const [selectedProjectId, setSelectedProjectId] = useState("");

  // data used to generate PDF out of selected project
  const [formattedData, setFormattedData] = useState(firstInputFormData);
  const [formattedData2, setFormattedData2] = useState(secondInputFormData);

  // project locked
  const [projectLocked, setProjectLocked] = useState(true);

  // editing of project in progress
  const [editingInProgress, setEditingInProgress] = useState(false);

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
        console.log(data);
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
    if (intentionSelection) {
      formattedData[0].elements[0].value = selectedProject?.nameSurname || "";
      formattedData[0].elements[1].value = selectedProject?.vocation || "";
      formattedData[0].elements[2].value = selectedProject?.department || "";
      formattedData[0].elements[3].value = selectedProject?.email || "";

      formattedData[1].elements[0].value = selectedProject?.projectTitle || "";
      formattedData[1].elements[1].value =
        selectedProject?.projectAcronym || "";
      formattedData[1].elements[2].value =
        selectedProject?.applicationDeadline || "";

      formattedData[2].elements[0].value =
        selectedProject?.projectSummary || "";

      formattedData[3].elements[0].value =
        selectedProject?.applicationURL || "";

      formattedData[4].elements[0].value =
        selectedProject?.projectApplicant || "";

      formattedData[5].elements[0].value =
        selectedProject?.projectPartners || "";

      formattedData[6].elements[0].value = selectedProject?.totalValue || "";
      formattedData[6].elements[1].value = selectedProject?.fesbValuePart || "";

      formattedData[7].elements[0].value = selectedProject?.newEmploymentBoolean || "";

      formattedData[8].elements[0].projectTeam = selectedProject?.projectTeam || "";

      
    } else if (approvalSelection) {
      formattedData2[0].elements[0].value = selectedProject?.nameSurname || "";
      formattedData2[0].elements[1].value = selectedProject?.vocation || "";
      formattedData2[0].elements[2].value = selectedProject?.department || "";
      formattedData2[0].elements[3].value = selectedProject?.email || "";
      formattedData2[0].elements[4].value =
        selectedProject?.mobilePhoneNumber || "";
      formattedData2[0].elements[5].value =
        selectedProject?.workTimeThisPercentage || "";
      formattedData2[0].elements[6].value =
        selectedProject?.workTimeOtherPercentage || "";
      formattedData2[0].elements[7].value =
        selectedProject?.teamLeaderNote || "";

      formattedData2[1].elements[0].value = selectedProject?.projectTitle || "";
      formattedData2[1].elements[1].value =
        selectedProject?.projectAcronym || "";
      formattedData2[1].elements[2].value =
        selectedProject?.applicationDeadline || "";

      formattedData2[2].elements[0].value =
        selectedProject?.projectSummary || "";

      formattedData2[3].elements[0].value =
        selectedProject?.applicationURL || "";

      formattedData2[4].elements[0].value =
        selectedProject?.sourceOfFunding || "";

      formattedData2[5].elements[0].value = selectedProject?.projectType || "";

      formattedData2[6].elements[0].value =
        selectedProject?.expectedProjectBeggining || "";

      formattedData2[7].elements[0].value =
        selectedProject?.expectedProjectDurationInMonths || "";

      formattedData2[8].elements[0].value =
        selectedProject?.projectApplicant || "";

      formattedData2[9].elements[0].value =
        selectedProject?.projectPartners || "";

      formattedData2[10].elements[0].value =
        selectedProject?.economicSubjectInvolvement || "";

      formattedData2[11].elements[0].value = selectedProject?.totalValue || "";

      formattedData2[12].elements[0].value =
        selectedProject?.fesbValuePart || "";
      formattedData2[12].elements[1].value =
        selectedProject?.currentPesonnelExpense || "";
      formattedData2[12].elements[2].value =
        selectedProject?.newPersonnelExpense || "";
      formattedData2[12].elements[3].value = selectedProject?.fesbValuePart
        ? selectedProject.fesbValuePart * 0.15
        : "";
      formattedData2[12].elements[4].value =
        selectedProject?.equipmentDescriptionAndExpense || "";
      formattedData2[12].elements[5].value =
        selectedProject?.equipmentAmortizationExpense || "";
      formattedData2[12].elements[6].value =
        selectedProject?.otherServicesExpense || "";
      formattedData2[12].elements[7].value =
        selectedProject?.travelExpense || "";
      formattedData2[12].elements[8].value = selectedProject?.expenseNote || "";

      formattedData2[13].elements[0].value =
        selectedProject?.partnerExpense || "";

      formattedData2[14].elements[0].value =
        selectedProject?.requestedFunding || "";

      formattedData2[15].elements[0].value = selectedProject?.downPayment || "";

      formattedData2[16].elements[0].value =
        selectedProject?.personalFinancingExpense || "";

      formattedData2[17].elements[0].value =
        selectedProject?.newEmploymentBoolean || "";

      formattedData2[18].elements[0].projectTeam = selectedProject?.projectTeam || "";

      formattedData2[19].elements[0].value = selectedProject?.consultantServices
        ? "Da"
        : "Ne";
    } else {
      console.log("No project selected");
    }
  }, [selectedProject, intentionSelection, approvalSelection]);

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

  // editing part
  const manageEditing = () => {
    setProjectEditable(true); // make project editable

    setProjectLocked(false); // unlock project

    // activate editing state
    setEditingInProgress(true);
  };

  const discardChanges = () => {
    setModalDiscardChangesIsOpen(true);
  };

  // handling PDF

  // handle pdf new tab
  const handlePDF = (projectData, title) => {
    // Assuming pdf() is a function that returns a Promise resolving to a blob
    // Generate the document
    const doc = <FirstInputFormPDF data={projectData} title={title} />;

    // Create a PDF blob
    pdf(doc)
      .toBlob()
      .then((blob) => {
        // Create a Blob URL
        const url = URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.download =
          selectedProject.nameSurname +
          " - " +
          selectedProject.projectTitle +
          ".pdf"; // Specify the filename to download

        // Append the link to the body, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Optional: Release the Blob URL to free up resources
        URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // TESTING START //

  const [projectId, setProjectId] = useState("");

  const handleProjectId = (event) => {
    setProjectId(event.target.value);
  };
  // console log outputs

  console.log("CURRENT PROJECT TEAM:\n" + selectedProject?.projectTeam);

  // TESTING END //

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
          setSelectedProject,
          setProjectLocked,
          projectLocked,
          modalDiscardChangesIsOpen,
          setModalDiscardChangesIsOpen,
          modalApproveProjectIsOpen,
          setModalApproveProjectIsOpen,
          modalDeclineProjectIsOpen,
          setModalDeclineProjectIsOpen,
          editingInProgress,
          setEditingInProgress,
          setModalMessageIsOpen,
          setMessageForModal,
          setLoadingSpinnerIsOpen
        }}
      >
        <div className="admin-dashboard-container">
          {/* MODAL COMPONENTS */}
          {modalSettingsIsOpen && <ModalSettings />}

          {modalUpdateProjectInfoIsOpen && <ModalUpdateProjectInfo />}

          {modalDiscardChangesIsOpen && <ModalDiscardChanges />}

          {modalApproveProjectIsOpen && <ModalApproveProject />}

          {modalDeclineProjectIsOpen && <ModalDeclineProject />}

          {modalMessageIsOpen && <ModalMessage modalMessage={messageForModal} setModalIsOpen={setModalMessageIsOpen} reload={true}/>}

          {loadingSpinnerIsOpen && <LoadingSpinner/>}



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
              {/* <div
                style={{
                  marginTop: "100px",
                  marginLeft: "100px",
                  marginLeft: "100px",
                }}
              >
                UPDATE PROJECT DATA:{JSON.stringify(updateProjectData)}
              </div> */}

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
            <div
              className={
                projectLocked
                  ? "single-application-container-locked"
                  : "single-application-container-unlocked"
              }
            >
              {selectedProject != null  &&
                pendingSelected &&
                (projectLocked ? (
                  <FontAwesomeIcon
                    icon={faLock}
                    style={{ alignSelf: "flex-start", marginBottom: "5px" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faLockOpen}
                    style={{ alignSelf: "flex-start", marginBottom: "5px" }}
                  />
                ))}

              {selectedProject != null &&
                pendingSelected /*to prevent rendering if the project is not selected*/ && (
                  <div className="manage-project-container">
                    <div
                      className="edit-button-container manage-button-style"
                      onClick={
                        !projectEditable
                          ? () => manageEditing()
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

                    {projectEditable && !projectLocked && (
                      <button
                        className="discard-changes-button manage-button-style"
                        onClick={() => discardChanges()}
                      >
                        ODBACI PROMJENE
                      </button>
                    )}

                    {!projectEditable && (
                      <div className="decision-buttons-container">
                        <button className="approve-button manage-button-style" onClick={() => setModalApproveProjectIsOpen(true)}>
                          ODOBRI
                        </button>

                        <button className="decline-button manage-button-style" onClick={() => setModalDeclineProjectIsOpen(true)}>
                            ODBIJ
                        </button>
                      </div>
                    )}
                  </div>
                )}

              {selectedProject && (
                <>
                  {/* PDF SECTION */}
                  <div className="project-to-pdf-container">
                    <p style={{ color: "#515151", fontWeight: "bold" }}>
                      Dohvati projekt u obliku pdf dokumenta:
                    </p>
                    <button
                      onClick={
                        intentionSelection
                          ? () => handlePDF(formattedData, "NAMJERA PRIJAVE")
                          : () =>
                              handlePDF(formattedData2, "TRAŽENJE SUGLASNOSTI")
                      }
                      className="project-to-pdf-button"
                    >
                      <div className="project-to-pdf-txt">PREUZMI</div>
                      <FontAwesomeIcon
                        icon={faDownload}
                        style={{ color: "#ffffff" }}
                      />
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
