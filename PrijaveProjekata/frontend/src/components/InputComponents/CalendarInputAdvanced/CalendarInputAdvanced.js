import React, { useEffect, useState, useContext } from 'react';

// context
import { AdminDashboardContext } from '../../../context/AdminDashboardContext.js';

// external libraries
import DatePicker, { registerLocale } from 'react-datepicker';
import hr from 'date-fns/locale/hr'; // croatian
import { addDays, isWeekend, addWeeks, parseISO, set, format  } from 'date-fns';


// style
import Style from './CalendarInputAdvanced.module.css';

// external styles
import 'react-datepicker/dist/react-datepicker.css';

// register croatian locale
registerLocale('hr', hr);

const CalendarInputAdvanced = ({ label, setSpecificState, initialDate, name, workingDaysLimit, isAdminDashboard, projectUpdateName, isSecondInputForm }) => {

    const [placeholderText, setPlaceholderText] = useState('mm/dd/yyyy');

    const [selectedDate, setSelectedDate] = useState(null);


    const { projectEditable, setUpdateProjectData } = useContext(AdminDashboardContext);

    useEffect(() => {
        // Check sessionStorage for existing value
        const storedDate = sessionStorage.getItem(name);

        // Check if initialDate is provided and parse it
        if(storedDate) {
            const parsedDate = new Date(storedDate);
            setSelectedDate(parsedDate);
        } 
        else if (initialDate) {
            const parsedDate = parseISO(initialDate);
            console.log("PARSED DATE" + parsedDate);    
            setSelectedDate(parsedDate);
        } else {
            // there is no initial date or stored date
        }
    }, []);

    useEffect(() => {
        if(isAdminDashboard) {
            const parsedDate = parseISO(initialDate);
            console.log("PARSED DATE" + parsedDate);
            setSelectedDate(parsedDate);
            setSpecificState(parsedDate);
        } else if(isSecondInputForm) {
            setSelectedDate(initialDate);
            setSpecificState(initialDate);
        }
    }, [initialDate]);


    useEffect(() => {
        // if date is not selected, set dd/MM/yyyy as placeholder text
        if (!selectedDate) {
            setPlaceholderText('mm/dd/yyyy');
        } else {
            // if date is selected, set empty string as placeholder text
            setPlaceholderText(''); 
        }
    }, [selectedDate]);

    // update sessionStorage when selectedDate changes
    useEffect(() => {
        if (selectedDate) { 
            sessionStorage.setItem(name, selectedDate);
        } else {
            // remove item from sessionStorage if selectedDate is null
            sessionStorage.removeItem(name); 
        }
    }, [selectedDate, name]);


    useEffect(() => {
        if(!isAdminDashboard) {
            setSpecificState(selectedDate);
        } 
    }, [selectedDate]);

    // restrictions for date picker
    
    // Function to check if a date is a working day (Monday to Friday)
    const isWorkingDay = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday
    };

    // Calculate the minimum selectable date
    const minSelectableDate = (() => {
        let currentDate = new Date();
        let workingDaysCount = 0;
        // while sum of wokring days is less than [workingDaysLimit]
        while (workingDaysCount < workingDaysLimit) {
            currentDate = addDays(currentDate, 1);
            if (isWorkingDay(currentDate)) {
                workingDaysCount++;
            }
        }
        return currentDate;
    })();

    // Function to filter selectable dates
    const isDateSelectable = (date) => {
        // Check if the date is a working day and is at least 7 working days from today
        return isWorkingDay(date) && date >= minSelectableDate;
    };

    // handle data change
    const handleChange = (date) => {
        setSelectedDate(date);
        // if isAdminDashboard is true, set updated data into updated data collector so it can be updated
        if(isAdminDashboard) {
            const formatDate = new Date(date).toISOString();
            setUpdateProjectData(prevState => ({
                ...prevState,
                [projectUpdateName]: formatDate
            }));
        }
    }


    return (  
        <div className={Style.DateContainer}>
            <label className={Style.DateLabel}>{label}</label>
            <DatePicker 
                showYearDropdown={true} 
                selected={selectedDate} 
                onChange={date => handleChange(date)}
                locale="hr"
                dateFormat="dd.MM.yyyy"
                placeholderText={placeholderText}
                filterDate={isDateSelectable}
                // if isAdminDashboard is true, disable is equal to !projectEditable... otherwise, input is not disabled
                disabled={isAdminDashboard ? !projectEditable : false}
            />
        </div>
    );
}
 
export default CalendarInputAdvanced;
