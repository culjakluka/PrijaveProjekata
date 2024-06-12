import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import hr from 'date-fns/locale/hr'; // croatian
import { addDays, isWeekend } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

// style
import Style from './CalendarInputAdvanced.module.css';

registerLocale('hr', hr);

const CalendarInputAdvanced = ({ setSpecificState, initialDate, name }) => {

    const [placeholderText, setPlaceholderText] = useState('mm/dd/yyyy');

    const [selectedDate, setSelectedDate] = useState(() => {
        // load value from sessionStorage
        const storedDate = sessionStorage.getItem(name);
        // if the value exists, set new date as storedDate, 
        // otherwise set initialDate or null(dd/MM/yyyy format)
        return storedDate ? new Date(storedDate) : initialDate || null;
    });



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
        //setSpecificState(selectedDate);
    }, [selectedDate]);

    // restrictions for date picker
    
    // function to check if a date is a working day (Monday to Friday)
    const isWorkingDay = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday
    };

     // Calculate the maximum selectable date (7 working days from today)
     const maxSelectableDate = addDays(new Date(), 7);

     // Function to filter selectable dates
    const isDateSelectable = (date) => {
        // Check if the date is a working day and is within the next 7 working days
        return isWorkingDay(date) && date <= maxSelectableDate;
    };

    return (  
        <div className={Style.DateContainer}>
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
