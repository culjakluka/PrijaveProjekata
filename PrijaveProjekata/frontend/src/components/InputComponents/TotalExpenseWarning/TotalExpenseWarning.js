import React, { useEffect, useContext, useState} from 'react';

// context
import { SecondInputFormDataContext } from '../../../context/SecondInputFormDataContext';

// style
import Style from './TotalExpenseWarning.module.css';

const TotalExpenseWarning = () => {

    const[showWarning, setShowWarning] = useState(false);
    const[warningMessage, setWarningMessage] = useState('Zbroj troškova je veći od dijela proračuna koji FESB pokriva!');

    const { totalExpense, fesbValuePart } = useContext(SecondInputFormDataContext);

    useEffect(() => {
        if(totalExpense > fesbValuePart) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }, [totalExpense, fesbValuePart]);

    return (
        <div>
            {showWarning && <div className={Style.WarningMessage}>{warningMessage}</div>}
        </div>
      );
}
 
export default TotalExpenseWarning;