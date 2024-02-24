import { useEffect, useState } from "react";
import "./CalendarInput.css"

const CalendarInput = ({name, label, initialDate}) => {
    
    const[date, setDate] = useState("");
    const[title, setTitle] = useState("");

    const handleDateChange = (event) => {
        setDate(event.target.value); // update date when the user changes input
    };

    useEffect(() => {
        setTitle(label);
        
        // after component mounts
        const savedDate = sessionStorage.getItem(name);
        // if savedDate exists in sessionStorage, load it
        if(savedDate) {
            setDate(savedDate);
        }

    }, [])


    // managing initialDate
    // initialDate is coming in ISO 8601 format -> 2025-10-09T22:00:00.000Z
    useEffect(() => {
        
        const savedDate = sessionStorage.getItem(name);
        
        if (savedDate) {
            // Load date from sessionStorage if available
            setDate(savedDate);
        } else if (initialDate) {
            // If sessionStorage doesn't have a value, use the initialDate
            const formattedDate = initialDate.split("T")[0];
            setDate(formattedDate);
        }
    }, [initialDate]);


    useEffect(() => {
        sessionStorage.setItem(name, date)
    }, [date])

    return (  
        <div className="calendar-input-container">
            <label>{title}</label>
            <input 
            type="date"
            id={name}
            value={date}
            onChange={handleDateChange}
            ></input>
        </div>
    );
}
 
export default CalendarInput;