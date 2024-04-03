import React, { useContext, useEffect } from "react";

// styles
import Style from '../ModalSettings.module.css'
import { ModalSettingsContext } from "../../../../../../context/ModalSettingsContext";


const Dean = () => {

    const { dean, setDean, handleUpdateDean } = useContext(ModalSettingsContext);

    const handleNameChange = (event) => {
        setDean({ ...dean, name: event.target.value });
    };

    const handleEmailChange = (event) => {
        setDean({ ...dean, email: event.target.value });
    };

    useEffect(() => {

    }, [dean])

    return (
        <div className={Style.DeanContainer}>
            <input className={Style.DeanProperties} placeholder="ime i prezime..." value={dean?.name} onChange={handleNameChange}></input>
            <input className={Style.DeanProperties} placeholder="mail..." value={dean?.email} onChange={handleEmailChange}></input>
            <button className={Style.UpdateDeanButton} onClick={() =>handleUpdateDean("65da41591ff862ef5d60d354", dean)}>AŽURIRAJ</button>
        </div>
      );
}
 
export default Dean;