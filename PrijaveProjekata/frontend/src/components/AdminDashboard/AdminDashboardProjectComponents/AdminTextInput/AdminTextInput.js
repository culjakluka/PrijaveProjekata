import React, { useEffect, useState } from "react";
import './AdminTextInput.css'
import '../../AdminDashboard.css'

const AdminTextInput = ({currentInputValue, currentLabelValue}) => {

    const [inputValue, setInputValue] = useState("");
    const [labelValue, setLabelValue] = useState("");

    useEffect(() => {
        setInputValue(currentInputValue);
        setLabelValue(currentLabelValue);
    }, [currentInputValue, currentLabelValue])

    return (  
        <div className="admin-text-input-container">
            <p className="admin-text-input-label">{labelValue}</p>
            <input className="admin-text-input" type="text" value={inputValue} readOnly></input>
        </div>
    );
}
 
export default AdminTextInput;