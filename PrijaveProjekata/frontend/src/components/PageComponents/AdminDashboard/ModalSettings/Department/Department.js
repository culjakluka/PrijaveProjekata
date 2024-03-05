import React from "react";
import Style from '../ModalSettings.module.css'

const Department = () => {
    return (  
        <div className={Style.DepartmentContainer}>
            <div>Naziv zavoda</div>
            <div>Predstojnik zavoda</div>
        </div>
    );
}
 
export default Department;