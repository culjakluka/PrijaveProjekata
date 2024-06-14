import { React, useEffect, useState, useContext } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faTimes as faXmark } from '@fortawesome/free-solid-svg-icons';

// style
import Style from './ModalApplicationUpdated.module.css';

// context
import { SecondInputFormDataContext } from "../../../context/SecondInputFormDataContext";

const ModalApplicationUpdated = (height, width, modalMessage, anotherMessag) => {

    const[heightPercentage, setHeightPercentage] = useState("25%");
    const[widthPercentage, setWidthPercentage] = useState("30%");
    const [message, setMessage] = useState("Prijava uspješno poslana!");

    // context - here bring the context of component here
    const { setModalApplicationUpdatedIsOpen } = useContext(SecondInputFormDataContext);

    useEffect(() => {
        if(height) {
            setHeightPercentage(height);
        }

        if(width) {
            setWidthPercentage(width);
        }

        if(modalMessage) {
            setMessage(modalMessage);
        }

    }, []);


    return (
        <div className={Style.ModalContainerOverlay}>
            <div className={Style.Modal} style={{height: heightPercentage, width: widthPercentage }}>
                <h3 className={Style.ModalQuestion}>{message}</h3>
            </div>
        </div>
    );
}
 
export default ModalApplicationUpdated;