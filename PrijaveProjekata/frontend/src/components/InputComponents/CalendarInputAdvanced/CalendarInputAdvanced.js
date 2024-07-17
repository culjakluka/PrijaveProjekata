import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import hr from 'date-fns/locale/hr'; // croatian
import { addDays, isWeekend, addWeeks, parseISO  } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

// style
import Style from './CalendarInputAdvanced.module.css';

registerLocale('hr', hr);

const CalendarInputAdvanced = ({ label, setSpecificState, initialDate, name, workingDaysLimit }) => {

    const [placeholderText, setPlaceholderText] = useState('mm/dd/yyyy');

    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        // Check sessionStorage for existing value
        const storedDate = sessionStorage.getItem(name);

        // Check if initialDate is provided and parse it
        if(storedDate) {
            if (storedDate) {
                const parsedDate = new Date(storedDate);
                setSelectedDate(parsedDate);
            }
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
            sessionStorage.setItem(name, selectedDate.toISOString());
        } else {
            // remove item from sessionStorage if selectedDate is null
            sessionStorage.removeItem(name); 
        }
    }, [selectedDate, name]);


    useEffect(() => {
        setSpecificState(selectedDate);
    }, [selectedDate]);

    // restrictions for date picker
    
    // Function to check if a date is a working day (Monday to Friday)
    const isWorkingDay = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday
    };

    // Calculate the minimum selectable date (7 working days from today)
    const minSelectableDate = (() => {
        let currentDate = new Date();
        let workingDaysCount = 0;
        // while sum of wokring days is less than 7
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
    return (  
        <div className={Style.DateContainer}>
            <label className={Style.DateLabel}>{label}</label>
            <DatePicker 
                showYearDropdown={true} 
                selected={selectedDate} 
                onChange={date => setSelectedDate(date)}
                locale="hr"
                dateFormat="dd.MM.yyyy"
                placeholderText={placeholderText}
                filterDate={isDateSelectable}
            />
        </div>
    );
}
 
export default CalendarInputAdvanced;
