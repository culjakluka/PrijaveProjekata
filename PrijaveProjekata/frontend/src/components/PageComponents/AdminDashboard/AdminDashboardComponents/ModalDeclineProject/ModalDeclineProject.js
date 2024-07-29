import { React, useContext } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as faXmark } from "@fortawesome/free-solid-svg-icons";

// style
import Style from "./ModalDeclineProject.module.css";

// context
import { AdminDashboardContext } from "../../../../../context/AdminDashboardContext";

// importing api requests
import {
  rejectProject
} from "../../ApiRequests";

const ModalDeclineProject = () => {
  const {
    setModalDeclineProjectIsOpen,
    selectedProject,
    setModalMessageIsOpen,
    setMessageForModal,
    setLoadingSpinnerIsOpen
  } = useContext(AdminDashboardContext);

  const handleYesButton = async () => {
    setModalDeclineProjectIsOpen(false); // hide modal approveProjectIsOpen
    setLoadingSpinnerIsOpen(true)
      
    const check = await rejectProject(selectedProject._id); // await for response

    if(check) {
      setMessageForModal("Projekt uspješno odbijen!");
      setModalMessageIsOpen(true); // open message
      setLoadingSpinnerIsOpen(false);
    } else if(!check) {
      setMessageForModal("Provjerite internet vezu!");
      setModalMessageIsOpen(true); // open message
      setLoadingSpinnerIsOpen(false);
    }
  };

  const handleNoButton = () => {
    setModalDeclineProjectIsOpen(false);
  };

  const closeModal = () => {
    setModalDeclineProjectIsOpen(false);
  };

  return (
    <div className={Style.ModalContainerOverlay}>
      <div className={Style.Modal}>
        <div className={Style.ModalTopContainer}>
          <button className={Style.ModalClose} onClick={() => closeModal()}>
            <FontAwesomeIcon icon={faXmark} size="1x" />
          </button>
          <h3 className={Style.ModalQuestion}>Odbij projekt?</h3>
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

export default ModalDeclineProject;
