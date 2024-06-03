import React, { useEffect, useState, useContext } from 'react'

// styles
import Style from './NumberInputSelect.module.css'

// context
import { SecondInputFormDataConext } from '../../../context/SecondInputFormDataContext';

const NumberInputSelect = ({name, label, initialValue, setSpecificState, currencyOrPercentage}) => {

    const[inputValue, setInputValue] = useState("");
    const[percentageSelected, setPercentageSelected] = useState(false);
    const[currencySelected, setCurrencySelected] = useState(true);
    const[totalProjectValue, setTotalProjectValue] = useState();
    const[finalValue, setFinalValue] = useState(0);

    const { totalValue } = useContext(SecondInputFormDataConext);

    // on start up, check if the value is available in the session storage
    useEffect(() => {
        try {
            const savedValue = sessionStorage.getItem(name);

            if(savedValue) {
                if(currencySelected) {
                    setInputValue(savedValue);
                    setFinalValue(savedValue);
                    setSpecificState(savedValue);

                } else if(percentageSelected) {
                    setFinalValue(totalValue * (parseInt(savedValue) / 100));
                    setInputValue(savedValue);
                    setSpecificState(totalValue * (parseInt(savedValue) / 100));
                } else {
                    console.log("Neither currency nor percentage selected!");
                }
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
                setFinalValue(initialValue);
            } else {
                console.log("savedValue and initialValue aren't available for ", name);
            }
        }catch(error) {

        }

    }, [initialValue])

    useEffect(() => {
        if(currencySelected) {
            setInputValue(inputValue);
            setFinalValue(inputValue);
        } else if(percentageSelected) {
            setFinalValue(totalValue * (parseInt(inputValue) / 100));

            console.log("totalValue : ", totalValue, "inputValue : ", inputValue);
        }
    }, [currencySelected, percentageSelected])
    
    useEffect(() => {
        if(currencySelected) {      
            setFinalValue(inputValue);
        } else if(percentageSelected) {
            setFinalValue(totalValue * (parseInt(inputValue) / 100));
            setSpecificState(totalValue * (parseInt(inputValue) / 100));
        }
    }, [totalValue])

    const handleChange = (event) => {
        
        const newValue = event.target.value;

        if(currencySelected) {
            setInputValue(newValue);
            setSpecificState(newValue);
            setFinalValue(newValue);
        } else if(percentageSelected) {
            setSpecificState(totalValue * (parseInt(newValue) / 100));
            setFinalValue(totalValue * (parseInt(newValue) / 100));
            setInputValue(newValue);
        }

        try{
            sessionStorage.setItem(name, newValue);
        } catch(error) {
            console.log("Unable to write value into session storage for ", name, error);
        }
    }

    const manageCurrencySelected = () => {
        setCurrencySelected(true);
        setPercentageSelected(false);
    }

    const managePercentageSelected = () => {
        setCurrencySelected(false);
        setPercentageSelected(true);
    }

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
                    <button onClick={() => managePercentageSelected()} className={percentageSelected ? Style.PercentageSelected : Style.Percentage}>%</button>
                    <button onClick={() => manageCurrencySelected()} className={currencySelected ? Style.CurrencySignSelected :  Style.CurrencySign}>{currencyOrPercentage}</button>
                </div>

                <div style={{marginLeft : "20px", fontSize : "1.2em"}}>({finalValue} €)</div>
            </div>
            
        </div>
    );
}
 
export default NumberInputSelect;