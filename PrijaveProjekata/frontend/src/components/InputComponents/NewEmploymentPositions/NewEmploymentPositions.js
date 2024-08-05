import React, { useState, useContext } from 'react';

// style
import Style from './NewEmploymentPositions.module.css';

// my components
import Position from './Position/Position';

// context
import { FirstInputFormDataContext } from '../../../context/FirstInputFormDataContext';
import { SecondInputFormDataContext } from '../../../context/SecondInputFormDataContext';

const NewEmploymentPositions = ({ formType }) => {
    
    const { newEmploymentPositions, setNewEmploymentPositions } = useContext(formType === "first" ? FirstInputFormDataContext : SecondInputFormDataContext);
    const [employmentPosition, setEmploymentPosition] = useState({
        positionName : '',
        positionSalary : '',
        positionPercentage : ''
    });

    // function that formats number from 1000 to 1,000 or 1000.00 if decimal
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

    // function that reformats number from 1,000 to 1000
    const reFormatNumber = (value) => {
        const numericValue = value.replace(/[^\d.]/g, '');
        return numericValue;
    }

    // handle name change in input
    const handleNameChange = (e) => {
        setEmploymentPosition({
            ...employmentPosition,
            positionName : e.target.value
        });
    }

    const handleBruttoSalaryChange = (e) => {
        setEmploymentPosition({
            ...employmentPosition,
            positionSalary : formatNumber(e.target.value)
        });
    }

    const handleTimePercentageChange = (e) => {
        const value = e.target.value;
        // format value so it doesn't exceed constraints -> 0>=value<=100 and length <= 3
        if((value === '' || (value >= 0 && value <= 100)) && value.length <= 3) {
            setEmploymentPosition({
                ...employmentPosition,
                positionPercentage : value
            });
        }

    }

    const addNewPosition = () => {
        
        if(employmentPosition.positionName === '' || employmentPosition.positionSalary === '' || employmentPosition.positionPercentage === '') {
            console.log('Sva polja moraju biti popunjena!');
        } else {
            setNewEmploymentPositions([...newEmploymentPositions, 
                {
                    positionName: employmentPosition.positionName, 
                    positionSalary: reFormatNumber(employmentPosition.positionSalary), 
                    positionPercentage: employmentPosition.positionPercentage}]);

            setEmploymentPosition({
                positionName : '',
                positionSalary : '',
                positionPercentage : ''
            });
        }
        
    }

    return (  
        <div className={Style.PositionsContainer}>   
            <div className={Style.InputContainer}>
                <div className={Style.InputTitle}>Naziv novog radnog mjesta</div>
                <input className={Style.ValueInput} onChange={handleNameChange} value={employmentPosition.positionName} type='text' placeholder='molimo popunite polje...'></input> 
                <div className={Style.InputTitle}>Bruto plaća</div>
                <input className={Style.ValueInput} onChange={handleBruttoSalaryChange} value={employmentPosition.positionSalary} type='text' placeholder='molimo popunite polje...'></input>
                <div className={Style.InputTitle}>Postotak radnog vremena</div>
                <input 
                    className={Style.ValueInput} 
                    type='number'
                    onChange={handleTimePercentageChange} 
                    value={employmentPosition.positionPercentage} 
                    placeholder='molimo popunite polje...'
                    min="0"
                    max="100"
                    >   
                </input>
                <button onClick={() => addNewPosition()}className={Style.AddNewPositionButton}>DODAJ NOVO RADNO MJESTO</button>
            </div>
            
            {newEmploymentPositions?.length > 0 ? newEmploymentPositions.map((position, index) => {
                return (
                    <Position key={index} positionProp={position} setNewPositionsProp={setNewEmploymentPositions} formatNumber={formatNumber} />
                );
            }) : <div style={{fontSize:'1em'}}>Ni jedno radno mjesto nije dodano...</div>
        }
        </div>
    );
}
 
export default NewEmploymentPositions;