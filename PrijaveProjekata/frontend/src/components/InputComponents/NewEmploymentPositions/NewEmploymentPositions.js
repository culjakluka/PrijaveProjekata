import React, { useState } from 'react';

// style
import Style from './NewEmploymentPositions.module.css';

const NewEmploymentPositions = () => {
    
    const [newPositions, setNewPositions] = useState([]);

    

    return (  
        <div>
            <div className={Style.InputContainer}>
                <input type='text'></input> 
                <input type='text'></input>
                <input type='text'></input>
            </div>
        </div>
    );
}
 
export default NewEmploymentPositions;