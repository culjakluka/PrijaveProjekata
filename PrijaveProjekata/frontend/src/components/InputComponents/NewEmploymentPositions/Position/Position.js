import React from 'react';

// style
import Style from '../NewEmploymentPositions.module.css';

const Position = ({ positionProp, setNewPositionsProp, formatNumber }) => {
    const { positionName, positionSalary, positionPercentage} = positionProp;

    const removePosition = () => {
        setNewPositionsProp(prevPositions => prevPositions.filter(pos => pos !== positionProp));
    }

    return (
        <div className={Style.PositionContainer}>
            <div className={Style.PositionValue} style={{fontWeight: 'bold'}}>{positionName}</div>
            <div className={Style.PositionValue}>Bruto plaća: {formatNumber(positionSalary)}€</div>
            <div className={Style.PositionValue}>Postotak radnog vremena: {positionPercentage}%</div>
            <button className={Style.RemovePositionButton} onClick={removePosition} >ukloni</button>
        </div>
    );
}

export default Position;
