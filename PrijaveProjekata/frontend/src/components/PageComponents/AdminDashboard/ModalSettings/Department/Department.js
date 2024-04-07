import React, { useState, useEffect } from "react";

// styles
import Style from '../ModalSettings.module.css'

// external components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// delete department
import { deleteDepartment } from "../departmentApi";

const Department = ({departmentName, headOfDepartmentName, departmentIdNumber}) => {

    const [departmentId, setDepartmentId] = useState("");

    // Delete an existing department
    const handleDeleteDepartment = async () => {
        try {
            const deletedDepartment = await deleteDepartment(departmentId);
            console.log('Department deleted successfully:', deletedDepartment);
            window.alert('Department deleted successfully:', deletedDepartment);
            // Optionally, update the state or perform any other actions after deleting the department
        } catch (error) {
            console.error('Error deleting department:', error);
            window.alert('Failed to delete department!');
        }
    };

    useEffect(() => {
        setDepartmentId(departmentIdNumber);
    }, []);

    return (  
        <div className={Style.DepartmentContainer}>
            <div className={Style.DepartmentInfo}>
                <div className={Style.DepartmentInfoElement} >{departmentName}</div>
                <div> - </div>
                <div className={Style.DepartmentInfoElement}>{headOfDepartmentName}</div>
            </div>
            <FontAwesomeIcon className={Style.DepartmentDeleteIcon} onClick={() => handleDeleteDepartment()} icon={faTrash} />
        </div>
    );
}
 
export default Department;