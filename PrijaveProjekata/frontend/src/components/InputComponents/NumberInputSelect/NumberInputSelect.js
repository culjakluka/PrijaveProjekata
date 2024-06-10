import React, { useEffect, useState, useContext } from 'react'

// styles
import Style from './NumberInputSelect.module.css'

// context
import { SecondInputFormDataContext } from '../../../context/SecondInputFormDataContext';

const NumberInputSelect = ({ name, label, initialValue, setSpecificState, currencyOrPercentage }) => {
    const [inputValue, setInputValue] = useState("");
    const [percentageSelected, setPercentageSelected] = useState(false);
    const [currencySelected, setCurrencySelected] = useState(true);
    const [finalValue, setFinalValue] = useState(0);

    const { totalValue } = useContext(SecondInputFormDataContext);

    // on start up, check if the value is available in the session storage
    useEffect(() => {
        try {
            const savedValue = sessionStorage.getItem(name);
            if (savedValue) {
                const parsedValue = parseFloat(savedValue);
                if (currencySelected) {
                    setInputValue(parsedValue);
                    setFinalValue(parsedValue);
                    setSpecificState(parsedValue);
                } else if (percentageSelected) {
                    const calculatedValue = totalValue * (parsedValue / 100);
                    setFinalValue(calculatedValue);
                    setSpecificState(calculatedValue);
                    setInputValue(parsedValue);
                } else {
                    console.log("Neither currency nor percentage selected!");
                }
            }
        } catch (error) {
            console.log("Value not available in sessionStorage!\n", error);
        }
    }, []);

    useEffect(() => {
        try {
            const savedValue = sessionStorage.getItem(name);
            if (savedValue) {
                const parsedValue = parseFloat(savedValue);
                setInputValue(parsedValue);
                setSpecificState(parsedValue);
            } else if (initialValue) {
                const parsedValue = parseFloat(initialValue);
                setInputValue(parsedValue);
                setSpecificState(parsedValue);
                setFinalValue(parsedValue);
            } else {
                console.log("savedValue and initialValue aren't available for ", name);
            }
        } catch (error) {
            console.log(error);
        }
    }, [initialValue, name, setSpecificState]);

    useEffect(() => {
        if (currencySelected) {
            setFinalValue(parseFloat(inputValue));
            setSpecificState(parseFloat(inputValue));
        } else if (percentageSelected) {
            const calculatedValue = totalValue * (parseFloat(inputValue) / 100);
            setFinalValue(calculatedValue);
            setSpecificState(calculatedValue);
        }
    }, [currencySelected, percentageSelected, inputValue, totalValue, setSpecificState]);

    useEffect(() => {
        if (currencySelected) {
            setFinalValue(parseFloat(inputValue));
        } else if (percentageSelected) {
            const calculatedValue = totalValue * (parseFloat(inputValue) / 100);
            setFinalValue(calculatedValue);
            setSpecificState(calculatedValue);
        }
    }, [totalValue, inputValue, currencySelected, percentageSelected, setSpecificState]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);

        if (currencySelected) {
            setSpecificState(parseFloat(newValue));
            setFinalValue(parseFloat(newValue));
        } else if (percentageSelected) {
            const calculatedValue = totalValue * (parseFloat(newValue) / 100);
            setSpecificState(calculatedValue);
            setFinalValue(calculatedValue);
        }

        try {
            sessionStorage.setItem(name, newValue);
        } catch (error) {
            console.log("Unable to write value into session storage for ", name, error);
        }
    };

    const manageCurrencySelected = () => {
        setCurrencySelected(true);
        setPercentageSelected(false);
    };

    const managePercentageSelected = () => {
        setCurrencySelected(false);
        setPercentageSelected(true);
    };

    // format number 1000 to 1,000.00, etc...
    const formatNumber = (value) => {
        if (isNaN(value) || value === null || value === undefined) {
            return '';
        }
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    };

    return (
        <div className={Style.NumberInputContainer}>
            <label className={Style.NumberInputLabel}>{label}</label>
            <div className={Style.NumberInputHolder}>
                <div className={Style.NumberInput}>
                    <input type='number'
                        value={inputValue}
                        onChange={handleChange}
                        className={Style.NumberInputInput}>
                    </input>
                    <button onClick={managePercentageSelected} className={percentageSelected ? Style.PercentageSelected : Style.Percentage}>%</button>
                    <button onClick={manageCurrencySelected} className={currencySelected ? Style.CurrencySignSelected : Style.CurrencySign}>{currencyOrPercentage}</button>
                </div>
                <div style={{ marginLeft: "20px", fontSize: "1.2em" }}>({formatNumber(finalValue)} €)</div>
            </div>
        </div>
    );
}

export default NumberInputSelect;
