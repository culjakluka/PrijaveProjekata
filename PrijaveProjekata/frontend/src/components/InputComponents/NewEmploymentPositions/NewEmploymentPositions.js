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
    const [currentPosition, setCurrentPosition] = useState({
        name : '',
        bruttoSalary : '',
        timePercentage : ''
    });

    // handle name change in input
    const handleNameChange = (e) => {
        setCurrentPosition({
            ...currentPosition,
            name : e.target.value
        });
    }

    const handleBruttoSalaryChange = (e) => {
        setCurrentPosition({
            ...currentPosition,
            bruttoSalary : e.target.value
        });
    }

    const handleTimePercentageChange = (e) => {
        setCurrentPosition({
            ...currentPosition,
            timePercentage : e.target.value
        });
    }

    const addNewPosition = () => {
        
        if(currentPosition.name === '' || currentPosition.bruttoSalary === '' || currentPosition.timePercentage === '') {
            console.log('Sva polja moraju biti popunjena!');
        } else {
            setNewEmploymentPositions([...newEmploymentPositions, currentPosition]);
            setCurrentPosition({
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
                <input className={Style.ValueInput} onChange={handleNameChange} value={currentPosition.name} type='text' placeholder='molimo popunite polje...'></input> 
                <div className={Style.InputTitle}>Bruto plaća</div>
                <input className={Style.ValueInput} onChange={handleBruttoSalaryChange} value={currentPosition.bruttoSalary} type='text' placeholder='molimo popunite polje...'></input>
                <div className={Style.InputTitle}>Postotak radnog vremena</div>
                <input className={Style.ValueInput} onChange={handleTimePercentageChange} value={currentPosition.timePercentage} type='text' placeholder='molimo popunite polje...'></input>
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