import { useEffect } from "react";

const CalendarInput = (name, label, initialDate) => {
    
    const[date, setDate] = useState("");


    useEffect(() => {
        setDate(initialDate);
    }, [])

    return (  
        <div className="calendar-input-container">
            <label value={label}></label>
            <input type="date"></input>
        </div>
    );
}
 
export default CalendarInput;