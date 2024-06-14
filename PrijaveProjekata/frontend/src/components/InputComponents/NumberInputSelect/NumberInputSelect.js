import React, { useEffect, useState, useContext } from 'react';
import Style from './NumberInputSelect.module.css';
import { FirstInputFormDataContext } from '../../../context/FirstInputFormDataContext';
import { SecondInputFormDataContext } from '../../../context/SecondInputFormDataContext';

const currencySign = "€";

const NumberInputSelect = ({ name, label, initialValue, setSpecificState, isFirstInputForm, isSecondInputForm }) => {
    const [inputValue, setInputValue] = useState("");
    const [percentageSelected, setPercentageSelected] = useState(false);
    const [currencySelected, setCurrencySelected] = useState(true);
    const [finalValue, setFinalValue] = useState(0);

    const { totalValue } = useContext(isFirstInputForm ? FirstInputFormDataContext : isSecondInputForm ? SecondInputFormDataContext : {});

    // on component mount, retrieve selection from sessionStorage
    useEffect(() => {
        try {
            const savedSelection = sessionStorage.getItem(`${name}_selection`);
            if (savedSelection) {
                if (savedSelection === "currency") {
                    setCurrencySelected(true);
                    setPercentageSelected(false);
                } else if (savedSelection === "percentage") {
                    setCurrencySelected(false);
                    setPercentageSelected(true);
                }
            }
        } catch (error) {
            console.log("Error retrieving currency/percentage selection from sessionStorage:", error);
        }
    }, []);

    // on start up, check if the value is available in the session storage
    useEffect(() => {
        try {
            const savedValue = sessionStorage.getItem(name);
            if (savedValue) {
                const parsedValue = parseFloat(savedValue);
                if (currencySelected) {
                    setInputValue(formatNumber(parsedValue));
                    setFinalValue(parsedValue);
                    setSpecificState(parsedValue);
                } else if (percentageSelected) {
                    const calculatedValue = totalValue * (parsedValue / 100);
                    setFinalValue(calculatedValue);
                    setSpecificState(calculatedValue);
                    setInputValue(formatNumber(parsedValue));
                } else {
                    console.log("Neither currency nor percentage selected!");
                }
            }
        } catch (error) {
            console.log("Value not available in sessionStorage!\n", error);
        }
    }, [currencySelected, percentageSelected, totalValue]);

    // if initial value is available, set it to the input field
    useEffect(() => {
        try {
            const savedValue = sessionStorage.getItem(name);
            if (savedValue) {
                const parsedValue = parseFloat(savedValue);
                setInputValue(formatNumber(parsedValue));
                setSpecificState(parsedValue);
            } else if (initialValue) {
                const parsedValue = parseFloat(initialValue);
                setInputValue(formatNumber(parsedValue));
                setSpecificState(parsedValue);
                setFinalValue(parsedValue);
            } else {
                console.log("savedValue and initialValue aren't available for ", name);
            }
        } catch (error) {
            console.log(error);
        }
    }, [initialValue]);

    useEffect(() => {
        if (currencySelected) {
            setFinalValue(parseFloat(inputValue.replace(/,/g, '')));
            setSpecificState(parseFloat(inputValue.replace(/,/g, '')));
        } else if (percentageSelected) {
            const calculatedValue = totalValue * (parseFloat(inputValue.replace(/,/g, '')) / 100);
            setFinalValue(calculatedValue);
            setSpecificState(calculatedValue);
        }
    }, [currencySelected, percentageSelected, inputValue, totalValue]);

    const handleChange = (event) => {
        let newValue = event.target.value;
    
        // remove all non-numeric characters except the decimal point
        newValue = newValue.replace(/[^\d.]/g, '');
    
        // split the number into parts before and after the decimal point
        const parts = newValue.split('.');
    
        // add commas for thousands
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
        // Ensure only up to two decimal places
        if (parts[1]) {
            parts[1] = parts[1].substring(0, 2);
        }
    
        newValue = parts.join('.');
    
        // limit percentage to be 100
        if (percentageSelected && parseFloat(newValue.replace(/,/g, '')) > 100) {
            newValue = '100';
        }
    
        setInputValue(newValue);
    
        if (currencySelected) {
            setFinalValue(parseFloat(newValue.replace(/,/g, '')));
            setSpecificState(parseFloat(newValue.replace(/,/g, '')));
        } else if (percentageSelected) {
            const calculatedValue = totalValue * (parseFloat(newValue.replace(/,/g, '')) / 100);
            setFinalValue(calculatedValue);
            setSpecificState(calculatedValue);
        }
    
        try {
            sessionStorage.setItem(name, newValue.replace(/,/g, ''));
        } catch (error) {
            console.log("Unable to write value into session storage for ", name, error);
        }
    };

    // save the selection to the session storage
    // and update the state
    const manageCurrencySelected = () => {
        setCurrencySelected(true);
        setPercentageSelected(false);
        try {
            sessionStorage.setItem(`${name}_selection`, "currency");
        } catch (error) {
            console.log("Unable to write currency selection into session storage for ", name, error);
        }
    };

    // save the selection to the session storage
    // and update the state
    const managePercentageSelected = () => {
        setCurrencySelected(false);
        setPercentageSelected(true);
        
        // check if current input value is > 100 and limit it to 100
        let newValue = inputValue;
        if (parseFloat(newValue.replace(/,/g, '')) > 100) {
            newValue = '100';
            setInputValue(newValue);
            setSpecificState(totalValue);
            try {
                sessionStorage.setItem(name, newValue.replace(/,/g, ''));
            } catch (error) {
                console.log("Unable to write value into session storage for ", name, error);
            }
        }

        try {
            sessionStorage.setItem(`${name}_selection`, "percentage");
        } catch (error) {
            console.log("Unable to write percentage selection into session storage for ", name, error);
        }
    };


    // format number from 1000 to 1,000.00, etc.
    const formatNumber = (value) => {
        if (isNaN(value) || value === null || value === undefined) {
            return '';
        }
        const numericValue = value.toString().replace(/[^\d.]/g, '');
        const parts = numericValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add commas - thousands
        if (parts[1]) {
            parts[1] = parts[1].substring(0, 2);
        }
        return parts.join('.');
    };

    return (
        <div className={Style.NumberInputContainer}>
            <label className={Style.NumberInputLabel}>{label}</label>
            <div className={Style.NumberInputHolder}>
                <div className={Style.NumberInput}>
                    <input type='text'
                        value={inputValue}
                        placeholder='0.00'
                        onChange={handleChange}
                        className={Style.NumberInputInput}>
                    </input>
                    <button onClick={managePercentageSelected} className={percentageSelected ? Style.PercentageSelected : Style.Percentage}>%</button>
                    <button onClick={manageCurrencySelected} className={currencySelected ? Style.CurrencySignSelected : Style.CurrencySign}>{currencySign}</button>
                </div>
                <div style={{ marginLeft: "20px", fontSize: "1em", alignSelf:"center" }}>{formatNumber(finalValue)} € - {isNaN((finalValue/totalValue)) ? "" : ((finalValue/totalValue)*100).toFixed(2)}% ukupne vrijednosti projekta</div>
            </div>
        </div>
    );
}

export default NumberInputSelect;
