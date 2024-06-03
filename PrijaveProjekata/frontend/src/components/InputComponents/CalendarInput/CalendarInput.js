import { useEffect, useState } from "react";
import "./CalendarInput.css"

const CalendarInput = ({name, label, setSpecificState, initialValue}) => {
    
    // useState to manage the input value state
    const [inputValue, setInputValue] = useState("");

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

    // when initial value changes or when it is loaded
    useEffect(() => {

        console.log("Initial value: ", initialValue);

        const savedValue = sessionStorage.getItem(name);

        if(savedValue) {
            // if value is available in session storage, take if from there
            setInputValue(savedValue);

            // callback that updates state in parent component
            setSpecificState(savedValue);

        } else if(initialValue) {
            
            console.log("Formatted initial value: ",initialValue.split("T")[0])

            setInputValue(initialValue.split("T")[0]);
            
            // callback that updates state in parent component
            setSpecificState(initialValue.split("T")[0]);

            sessionStorage.setItem(name, initialValue.split("T")[0]);
        }

    }, [initialValue])  


    // useEffect to save input value to local session storage whenever it changes
    useEffect(() => {

        // store the input value in local storage with the 'name' as the key
        sessionStorage.setItem(name, inputValue);

    }, [inputValue, name]); // re-run this effect when 'inputValue' or 'name' changes

    // format date
    const formatDate = (value) => { 
        if(!value) return '';

        const[year, month, day] = value.split('-');
        return `${day}/${month}/${year}`;
    }

    const handleDataBackToISO = (value) => {
        if(!value) return '';

        const[day, month, year] = value.split('/');
        return `${year}-${month}-${day}`;
    }

    return (  
        <div className="calendar-input-container">
            <label>{label}</label>
            <input 
            type="date"
            id={name}
            value={inputValue}
            onChange={handleInputChange}
            ></input>
        </div>
    );
}
 
export default CalendarInput;