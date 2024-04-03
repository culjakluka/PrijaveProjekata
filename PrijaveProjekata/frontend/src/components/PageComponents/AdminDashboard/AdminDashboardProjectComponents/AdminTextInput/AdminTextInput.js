import React, { useContext, useEffect, useState } from "react";
import './AdminTextInput.css';
import '../../AdminDashboard.css';

// context
import { AdminDashboardContext } from '../../../../../context/AdminDashboardContext.js'

const AdminTextInput = ({ currentInputValue, currentLabelValue, editable, projectUpdateName}) => {
    const [inputValue, setInputValue] = useState("");
    const [labelValue, setLabelValue] = useState("");
    const [isEditable, setIsEditable] = useState(false);

    // context
    const {projectEditable, setProjectEditable, updateProjectData, setUpdateProjectData} = useContext(AdminDashboardContext);

    useEffect(() => {
        setLabelValue(currentLabelValue);
    }, [currentLabelValue]);

    // Set initial input value when the component mounts
    useEffect(() => {
        setInputValue(currentInputValue);
    }, [currentInputValue]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setUpdateProjectData(prevState => ({
            ...prevState,
             [projectUpdateName] : currentInputValue
        }))
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