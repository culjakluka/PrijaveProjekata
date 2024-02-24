import React from "react";
import './Question.css'

const Question = ({questionText}) => {


    return(
        <div className="question">
            <h2 className="question-text">{questionText}</h2>
        </div>
    )
}

export default Question