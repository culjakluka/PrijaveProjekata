import React from 'react';

// style
import Style from '../NewEmploymentPositions.module.css';

const Position = ({ positionProp, setNewPositionsProp }) => {
    const { name, bruttoSalary, timePercentage } = positionProp;

    const removePosition = () => {
        setNewPositionsProp(prevPositions => prevPositions.filter(pos => pos !== positionProp));
    }

    return (
        <div className={Style.PositionContainer}>
            <div className={Style.PositionValue} style={{fontWeight: 'bold'}}>{name}</div>
            <div className={Style.PositionValue}>Bruto plaća: {bruttoSalary}€</div>
            <div className={Style.PositionValue}>Postotak radnog vremena: {timePercentage}%</div>
            <button className={Style.RemovePositionButton} onClick={removePosition} >ukloni</button>
        </div>
    );
}

export default Position;
