import { React, useEffect, useState, useContext } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as faXmark } from "@fortawesome/free-solid-svg-icons";

// style
import Style from "./ModalMessage.module.css";

// context
import { FirstInputFormDataContext } from "../../../context/FirstInputFormDataContext";

const ModalMessage = ({
  height,
  width,
  isMissingFieldsModal,
  modalMessage,
  missingFieldsContent,
  setModalIsOpen,
  reload,
  fontSizeProp
}) => {
  const [heightPercentage, setHeightPercentage] = useState("20%");
  const [widthPercentage, setWidthPercentage] = useState("30%");
  const [fontSize, setFontSize] = useState("1.5em");
  const [message, setMessage] = useState("Molimo popunite sva polja!");

  useEffect(() => {
    if (height) {
      setHeightPercentage(height);
    }

    if (width) {
      setWidthPercentage(width);
    }

    if(fontSizeProp){
      setFontSize(fontSizeProp);
    }

    if (modalMessage) {
      if (isMissingFieldsModal) {
        let fieldsMessage = "Molimo popunite sva polja: ";
        for (let i = 0; i < modalMessage.length; i++) {
          fieldsMessage += modalMessage[i] + ", ";
        }
        setMessage(fieldsMessage);
      } else {
        setMessage(modalMessage);
      }
    }
  }, []);

  const handleYesButton = () => {
    setModalIsOpen(false);
    if (reload) {
      window.location.reload();
    }
  };

  return (
    <div className={Style.ModalContainerOverlay}>
      <div
        className={Style.Modal}
        style={{ height: heightPercentage, width: widthPercentage }}
      >
        <div className={Style.ModalMessageContainer}>
          <div className={Style.ModalMessageMessage} style={{fontSize: fontSize}}>{message}</div>
        </div>
        <div className={Style.ModalButtonsContainer}>
          <button
            onClick={() => handleYesButton()}
            className={Style.ModalYesButton}
          >
            U REDU
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;
