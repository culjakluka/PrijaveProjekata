import React from "react";
import './AdminQuestion.css'

const AdminQuestion = ({questionText}) => {


    return(
        <div className="admin-question">
            <h2 className="admin-uestion-text">{questionText}</h2>
        </div>
    )
}

export default AdminQuestion