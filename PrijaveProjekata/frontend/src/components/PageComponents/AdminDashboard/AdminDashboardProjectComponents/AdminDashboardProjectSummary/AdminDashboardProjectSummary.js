import React, { useContext, useEffect, useState } from "react";
import { AdminDashboardContext } from '../../../../../context/AdminDashboardContext.js';

// style
import Style from './AdminDashboardProjectSummary.module.css';

const AdminDashboardProjectSummary = 
({  currentInputValue, 
    currentLabelValue,
    editable,
    projectUpdateName}) => {
    
    const [inputValue, setInputValue] = useState("");
    const [labelValue, setLabelValue] = useState("");

    const { projectEditable, setUpdateProjectData, projectLocked } = useContext(AdminDashboardContext);

    // Update labelValue when currentLabelValue changes
    useEffect(() => {
        setLabelValue(currentLabelValue);
    }, [currentLabelValue]);

    // if isDate = true
    // update inputValue when currentInputValue changes or if it's a date, format it
    useEffect(() => {
        setInputValue(currentInputValue);
    }, [currentInputValue, projectEditable]);

    // Handle changes to the input value
    const handleChange = (e) => {
        setInputValue(e.target.value);

        setUpdateProjectData(prevState => ({
            ...prevState,
            [projectUpdateName]: e.target.value
        }));
    };

    return (
        <div className={Style.AdminProjectSummaryContainer}>
            <p className={Style.AdminProjectSummaryLabel}>{labelValue}</p>
            <textarea
                className={Style.AdminProjectSummary}
                type="text"
                readOnly={!projectEditable}
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default AdminDashboardProjectSummary;
