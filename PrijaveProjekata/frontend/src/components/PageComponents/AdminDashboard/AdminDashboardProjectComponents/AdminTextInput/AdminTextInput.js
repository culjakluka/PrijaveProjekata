import React, { useContext, useEffect, useState } from "react";
import './AdminTextInput.css';
import '../../AdminDashboard.css';

// context
import { AdminDashboardContext } from '../../../../../context/AdminDashboardContext.js';

const AdminTextInput = ({ currentInputValue, currentLabelValue, editable, projectUpdateName, isDate }) => {
    const [inputValue, setInputValue] = useState("");
    const [labelValue, setLabelValue] = useState("");

    // context
    const { projectEditable, setProjectEditable, updateProjectData, setUpdateProjectData, selectedProject, projectLocked } = useContext(AdminDashboardContext);

    useEffect(() => {
        setLabelValue(currentLabelValue);
    }, [currentLabelValue]);

    
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
    }, [currentInputValue, isDate]);

    useEffect(() => {
        if (isDate && inputValue) {
            
            const date = new Date(inputValue);
            if (!isNaN(date)) {
                
                const day = String(date.getUTCDate()).padStart(2, '0');
                const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
                const year = date.getUTCFullYear();

                
                const fixedDate = `${day}.${month}.${year}`;
                setInputValue(fixedDate);
            }
        }
    }, [projectLocked, isDate, inputValue]);

    useEffect(() => {
        if (isDate && inputValue) {
            
            const date = new Date(inputValue);
            if (!isNaN(date)) {
                
                const day = String(date.getUTCDate()).padStart(2, '0');
                const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
                const year = date.getUTCFullYear();

                
                const fixedDate = `${day}.${month}.${year}`;
                setInputValue(fixedDate);
            }
        }
    }, [isDate, inputValue]);

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
