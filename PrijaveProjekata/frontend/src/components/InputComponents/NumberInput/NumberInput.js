import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Style from './NumberInput.module.css';

const currencySign = "€";

const NumberInput = ({ name, label, initialValue, setSpecificState }) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        try {
            const savedValue = sessionStorage.getItem(name);
            if (savedValue) {
                setInputValue(formatNumber(savedValue));
                setSpecificState(savedValue);
            } else if (initialValue) {
                setInputValue(formatNumber(initialValue));
                setSpecificState(initialValue);
            }
        } catch (error) {
            console.log('Value not available in sessionStorage!\n', error);
        }
    }, [initialValue, name, setSpecificState]);

    // function to format the number
    const formatNumber = (value) => {
        // remove all non digit characters - preventing user from entering anything other than numbers
        const numericValue = value.replace(/[^\d.]/g, '');

        // split the number into parts before and after the decimal point
        const parts = numericValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands

        // Ensure only up to two decimal places
        if (parts[1]) {
            parts[1] = parts[1].substring(0, 2);
        }

        return parts.join('.');
    };

    const handleChange = (event) => {
        const rawValue = event.target.value;
        const formattedValue = formatNumber(rawValue);

        setInputValue(formattedValue);
        setSpecificState(formattedValue.replace(/,/g, ''));

        try {
            sessionStorage.setItem(name, formattedValue.replace(/,/g, ''));
        } catch (error) {
            console.log("Unable to write value into session storage for ", name, error);
        }
    };

    return (
        <div className={Style.NumberInputContainer}>
            <label className={Style.NumberInputLabel}>{label}</label>
            <div className={Style.NumberInputHolder}>
                <input
                    type='text' // Changed to text input
                    value={inputValue}
                    onChange={handleChange}
                    className={Style.NumberInputInput}
                    placeholder="0.00"
                />
                <div className={Style.CurrencySign}>{currencySign}</div>
            </div>
        </div>
    );
}

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setSpecificState: PropTypes.func.isRequired,
};

NumberInput.defaultProps = {
    initialValue: '',
};

export default NumberInput;
