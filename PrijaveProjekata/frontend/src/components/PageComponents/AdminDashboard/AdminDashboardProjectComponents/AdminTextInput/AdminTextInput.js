import React, { useContext, useEffect, useState } from "react";
import './AdminTextInput.css';
import '../../AdminDashboard.css';
import { AdminDashboardContext } from '../../../../../context/AdminDashboardContext.js';

const AdminTextInput = ({ currentInputValue, currentLabelValue, editable, projectUpdateName, isDate }) => {
    const [inputValue, setInputValue] = useState("");
    const [labelValue, setLabelValue] = useState("");

    const { projectEditable, setUpdateProjectData, projectLocked } = useContext(AdminDashboardContext);

    // Update labelValue when currentLabelValue changes
    useEffect(() => {
        setLabelValue(currentLabelValue);
    }, [currentLabelValue]);

    // Update inputValue when currentInputValue changes or if it's a date, format it
    useEffect(() => {
        if (isDate && currentInputValue) {
            const date = new Date(currentInputValue);
            if (!isNaN(date)) {
                const day = String(date.getUTCDate()).padStart(2, '0');
                const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
                const year = date.getUTCFullYear();
                const fixedDate = `${day}.${month}.${year}`;
                setInputValue(fixedDate);
            } else {
                setInputValue(currentInputValue);
            }
        } else {
            setInputValue(currentInputValue);
        }
    }, [currentInputValue, isDate, projectEditable]);

    // Handle changes to the input value
    const handleChange = (e) => {
        setInputValue(e.target.value);

        setUpdateProjectData(prevState => ({
            ...prevState,
            [projectUpdateName]: e.target.value
        }));
    };

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
};

export default AdminTextInput;
