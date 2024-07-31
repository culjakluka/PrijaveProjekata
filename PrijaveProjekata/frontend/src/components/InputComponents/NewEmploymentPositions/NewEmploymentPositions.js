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
            positionSalary : e.target.value
        });
    }

    const handleTimePercentageChange = (e) => {
        setEmploymentPosition({
            ...employmentPosition,
            positionPercentage : e.target.value
        });
    }

    const addNewPosition = () => {
        
        if(employmentPosition.positionName === '' || employmentPosition.positionSalary === '' || employmentPosition.positionPercentage === '') {
            console.log('Sva polja moraju biti popunjena!');
        } else {
            setNewEmploymentPositions([...newEmploymentPositions, employmentPosition]);
            setEmploymentPosition({
                name : '',
                bruttoSalary : '',
                timePercentage : ''
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
                <input className={Style.ValueInput} onChange={handleTimePercentageChange} value={employmentPosition.positionPercentage} type='text' placeholder='molimo popunite polje...'></input>
                <button onClick={() => addNewPosition()}className={Style.AddNewPositionButton}>Dodaj novo radno mjesto</button>
            </div>
            
            {newEmploymentPositions?.length > 0 ? newEmploymentPositions.map((position, index) => {
                return (
                    <Position key={index} positionProp={position} setNewPositionsProp={setNewEmploymentPositions} />
                );
            }) : <div style={{fontSize:'1em'}}>Ni jedno radno mjesto nije dodano...</div>
        }
        </div>
    );
}
 
export default NewEmploymentPositions;