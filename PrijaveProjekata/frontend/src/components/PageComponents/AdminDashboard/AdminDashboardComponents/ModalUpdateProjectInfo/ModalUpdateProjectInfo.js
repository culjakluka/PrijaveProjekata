import React, { useState, useEFfect, useContext } from "react";

// external icons

// external components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faXmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// style
import Style from "./ModalUpdateProjectInfo.module.css";

// context
import { AdminDashboardContext } from "../../../../../context/AdminDashboardContext";

// api -> update project info set
import { adminUpdateProjectInfoSet } from "../../ApiRequests.js";
import { set } from "date-fns";

const ModalUpdateProjectInfo = () => {

  // loading data from Admin Dashborad Context so it can be updated properly
  const {
    modalUpdateProjectInfoIsOpen,
    setModalUpdateProjectInfoIsOpen,
    handleEditable,
    updateProjectData,
    setUpdateProjectData,
    selectedProject,
    setSelectedProject,
    projectLocked,
    setProjectLocked,
    setEditingInProgress,
    setLoadingSpinnerIsOpen,
    setModalMessageNoReloadIsOpen,
    setMessageForNoReloadModal,
  } = useContext(AdminDashboardContext);

  const handleYesButton = async () => {

    // start spinner - spinning animation
    setLoadingSpinnerIsOpen(true);

    // taking project id from already selected project and updating it with new data that has been collected in updateProjectData
    const check = await adminUpdateProjectInfoSet(selectedProject._id, updateProjectData);

    if(check) {
      // stop spinner - spinning animation
      setLoadingSpinnerIsOpen(false);
      // making project uneditable
      handleEditable();
      // hiding modal
      setModalUpdateProjectInfoIsOpen(false);
      // so the same project again can be displayed
      setSelectedProject({ ...selectedProject, ...updateProjectData });
      // resetting update project data
      setUpdateProjectData({});
      // locking project
      setProjectLocked(true);
      // hiding edit in progress
      setEditingInProgress(false);
      // setting message for modal
      setMessageForNoReloadModal("Projekt uspješno ažuriran!");
      // opening message modal
      setModalMessageNoReloadIsOpen(true);
    }
    
  };

  const handleNoButton = () => {
    setModalUpdateProjectInfoIsOpen(false);
  };

  const closeModal = () => {
    setModalUpdateProjectInfoIsOpen(false);
  };

  return (
    <div className={Style.ModalContainerOverlay}>
      <div className={Style.Modal}>
        <div className={Style.ModalTopContainer}>
          <button className={Style.ModalClose} onClick={() => closeModal()}>
            <FontAwesomeIcon icon={faXmark} size="1x" />
          </button>
          <h3 className={Style.ModalQuestion}>Završi uređivanje dokumenta?</h3>
        </div>

        <div className={Style.ModalButtonsContainer}>
          <button
            onClick={() => handleYesButton()}
            className={Style.ModalButton}
          >
            DA
          </button>
          <button
            onClick={() => handleNoButton()}
            className={Style.ModalButton}
          >
            NE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateProjectInfo;
