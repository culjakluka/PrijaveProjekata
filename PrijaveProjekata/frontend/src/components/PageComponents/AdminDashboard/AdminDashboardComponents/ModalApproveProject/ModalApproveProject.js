import { React, useContext } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as faXmark } from "@fortawesome/free-solid-svg-icons";

// style
import Style from "./ModalApproveProject.module.css";

// context
import { AdminDashboardContext } from "../../../../../context/AdminDashboardContext";

// importing api requests
import {
  approveFirstFormSubmit,
  approveSecondFormSubmit,
} from "../../ApiRequests";

const ModalApproveProject = () => {
  const {
    modalApproveProjectIsOpen,
    setModalApproveProjectIsOpen,
    intentionSelection,
    selectedProject,
  } = useContext(AdminDashboardContext);

  const handleYesButton = () => {
    if (intentionSelection) {
      approveFirstFormSubmit(selectedProject._id);
      setModalApproveProjectIsOpen(false);
    } else if (!intentionSelection) {
      approveSecondFormSubmit(selectedProject._id);
      setModalApproveProjectIsOpen(false);
    } else {
      console.log("Intention selection is not set!");
      window.alert("There is an error with intention selection!");
    }
  };

  const handleNoButton = () => {
    setModalApproveProjectIsOpen(false);
  };

  const closeModal = () => {
    setModalApproveProjectIsOpen(false);
  };

  return (
    <div className={Style.ModalContainerOverlay}>
      <div className={Style.Modal}>
        <div className={Style.ModalTopContainer}>
          <button className={Style.ModalClose} onClick={() => closeModal()}>
            <FontAwesomeIcon icon={faXmark} size="1x" />
          </button>
          <h3 className={Style.ModalQuestion}>Odobri projekt?</h3>
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

export default ModalApproveProject;
