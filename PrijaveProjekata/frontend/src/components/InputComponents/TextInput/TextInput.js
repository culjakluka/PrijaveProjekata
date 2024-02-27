import React, { useEffect, useState } from 'react'
import './TextInput.css'
import { setDate } from 'date-fns';

// component TextInput takes "label" and "name" as props
const TextInput = ({label, name, setSpecificState, initialValue = ''}) => {

    // useState to manage the input value state
    const [inputValue, setInputValue] = useState(initialValue);

    // function to handle input changes
    const handleInputChange = (event) => {
        // update the inputValue state as the input changes
        setInputValue(event.target.value);
        
        sessionStorage.setItem(name, event.target.value)


        // callback that updates state in parent value
        setSpecificState(event.target.value);
    }

    // after component mounts
    useEffect(() => {
        const savedValue = sessionStorage.getItem(name);

        console.log("Retrived value from session storage: ", savedValue);

        if(savedValue) {
            setInputValue(savedValue);
            
            // callback that updates state in parent value
            setSpecificState(savedValue);
        }

    }, [])



    // useEffect to save input value to local session storage whenever it changes
    useEffect(() => {

        // store the input value in local storage with the 'name' as the key
        sessionStorage.setItem(name, inputValue);

    }, [inputValue, name]); // re-run this effect when 'inputValue' or 'name' changes

    return(
        <div className="text-input">
            <label>{label}</label>
            <input name={name} value={inputValue} onChange={handleInputChange} placeholder="empty..." type="text"></input>
        </div>
    )
}


export default TextInput