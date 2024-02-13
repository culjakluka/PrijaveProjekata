import React, { useContext, useEffect, useState } from "react";
import './AdminTextInput.css';
import '../../AdminDashboard.css';
import { AdminDashboardContext } from "../../context/AdminDashboardContext";

const AdminTextInput = ({ currentInputValue, currentLabelValue, editable}) => {
    const [inputValue, setInputValue] = useState("");
    const [labelValue, setLabelValue] = useState("");
    const [isEditable, setIsEditable] = useState(false);

    // context
    const {projectEditable, setProjectEditable} = useContext(AdminDashboardContext);

    useEffect(() => {
        setLabelValue(currentLabelValue);
    }, [currentLabelValue]);

    // Set initial input value when the component mounts
    useEffect(() => {
        setInputValue(currentInputValue);
    }, [currentInputValue]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <div className="admin-text-input-container">
            <p className="admin-text-input-label">{labelValue}</p>
            <input
                className="admin-text-input"
                type="text"
                readOnly={!projectEditable}
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
}

export default AdminTextInput;