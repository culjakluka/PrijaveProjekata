import React, { useEffect, useState } from 'react'

// styles
import Style from './NumberInput.module.css'

const NumberInput = ({name, label, initialValue, setSpecificState, currencyCheck}) => {

    const[inputValue, setInputValue] = useState("");
    const[isCurreny, setIsCurrency] = useState(true)

    useEffect(() => {
        
        try {
            // check if there is value stored in sessionStorage
            const savedValue = sessionStorage.getItem(name);

            if(savedValue) {
                setInputValue(savedValue)
            }

        } catch(error) {
            console.log("Value in sessionStorage not available for ", name);
        }

        if(currencyCheck) {
            setIsCurrency(currencyCheck);
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
                <div className={Style.CurrencySign}>€</div>
                <input type='number'
                    value={inputValue} 
                    onChange={handleChange} 
                    className={Style.NumberInputInput}>
                </input>
            </div>
        </div>
    );
}
 
export default NumberInput;