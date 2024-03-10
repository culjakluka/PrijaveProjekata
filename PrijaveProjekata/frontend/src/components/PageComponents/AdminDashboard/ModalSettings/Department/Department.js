import React from "react";


import Style from '../ModalSettings.module.css'

// external components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Department = ({departmentName, headOfDepartmentName}) => {
    return (  
        <div className={Style.DepartmentContainer}>
            <div>{departmentName}</div>
            <div>{headOfDepartmentName}</div>
            <FontAwesomeIcon icon={faTrash} />
        </div>
    );
}
 
export default Department;