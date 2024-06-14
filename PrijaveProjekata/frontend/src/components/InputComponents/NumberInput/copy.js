import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// styles
import Style from './NumberInput.module.css'

const currencySign = "€";

const NumberInput = ({name, label, initialValue, setSpecificState}) => {

    const[inputValue, setInputValue] = useState("");
    const[displayValue, setDisplayValue] = useState("");

    useEffect(() => {
        try {
            const savedValue = sessionStorage.getItem(name);
            if (savedValue) {
                setInputValue(savedValue);
                setDisplayValue(formatNumber(savedValue));
                setSpecificState(savedValue);
            } else if (initialValue) {
                setInputValue(initialValue);
                setDisplayValue(formatNumber(initialValue));
                setSpecificState(initialValue);
            }
        } catch (error) {
            console.log('Value not available in sessionStorage!\n', error);
        }
    }, [initialValue, name, setSpecificState]);

    const formatNumber = (value) => {
        // Parse the numeric value (remove commas if present)
        const numericValue = parseFloat(value.replace(/,/g, ''));
        if (isNaN(numericValue)) return ""; // Return empty string if not a valid number

        // Format the number with commas and fixed to two decimal places
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numericValue);
    };

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setSpecificState(newValue);
        setDisplayValue(formatNumber(newValue));

        try {
            sessionStorage.setItem(name, newValue);
        } catch (error) {
            console.log("Unable to write value into session storage for ", name, error);
        }
    };


    return (  
        <div className={Style.NumberInputContainer}>
            <label className={Style.NumberInputLabel}>{label}</label>
            <div className={Style.NumberInputHolder}>
                <div className={Style.BackgroundDiv}>{displayValue}</div>
                <input type='number'
                    value={inputValue} 
                    onChange={handleChange} 
                    className={Style.NumberInputInput}>
                </input>
                <div className={Style.CurrencySign}>{currencySign}</div>
            </div>
        </div>
    );
}

NumberInput.propTypes = {
    name : PropTypes.string.isRequired,
    label : PropTypes.string.isRequired,
    initialValue : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setSpecificState : PropTypes.func.isRequired
}

NumberInput.defaultProps = {
    initialValue: '',
};


export default NumberInput;