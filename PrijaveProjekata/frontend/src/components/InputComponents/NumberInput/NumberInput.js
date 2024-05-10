import React, { useEffect, useState } from 'react'

// styles
import Style from './NumberInput.module.css'

const NumberInput = ({name, label, initialValue, setSpecificState, currencyOrPercentage}) => {

    const[inputValue, setInputValue] = useState("");
    const[currency, setCurrency] = useState("")

    useEffect(() => {
        try {
            const savedValue = sessionStorage.getItem(name);

            if(savedValue) {
                setInputValue(savedValue)
            }

        }
        catch(error) {
            console.log("Value not available in sessionStorage!\n", error)
        }
    }, [])

    useEffect(() => {
        try{
            const savedValue = sessionStorage.getItem(name);

            if(savedValue) {
                setInputValue(savedValue);
                setSpecificState(savedValue);
            } else if(initialValue) {
                setInputValue(initialValue);
                setSpecificState(initialValue);
            } else {
                console.log("savedValue and initialValue aren't available for ", name);
            }
        }catch(error) {

        }

    }, [initialValue])
    
    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setSpecificState(newValue);

        try{
            sessionStorage.setItem(name, newValue);
        } catch(error) {
            console.log("Unable to write value into session storage for ", name, error);
        }
    }

    return (  
        <div className={Style.NumberInputContainer}>
            <label className={Style.NumberInputLabel}>{label}</label>
            <div className={Style.NumberInputHolder}>
                <input type='number'
                    value={inputValue} 
                    onChange={handleChange} 
                    className={Style.NumberInputInput}>
                </input>
                <div className={Style.CurrencySign}>{currencyOrPercentage}</div>
            </div>
        </div>
    );
}
 
export default NumberInput;