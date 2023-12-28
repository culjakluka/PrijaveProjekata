import React, { useEffect, useState } from 'react'
import style from './TextInput.css'
import { useFormContext } from '../../context/FormContext'


// component TextInput takes "label" and "name" as props
const TextInput = ({label, name}) => {

    const {formData, updateFormData} = useFormContext();

    const handleChange = (event) => {
        const {value} = event.target;
        updateFormData(name, value);
    }

    return(
        <div className="text-input">
            <label>{label}</label>
            <input 
            name={name} 
            value={formData[name]} 
            placeholder="empty..."
            onChange={handleChange}  
            type="text"
            >
            </input>
        </div>
    )
}


export default TextInput