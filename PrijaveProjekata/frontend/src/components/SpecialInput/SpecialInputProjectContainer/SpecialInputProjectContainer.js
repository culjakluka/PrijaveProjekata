import react, { useState } from 'react'
import '../SpecialInput.css'
import SpecialInputProject from '../SpecialInputProject/SpecialInputProject';
import { Button } from 'bootstrap';

const SpecialInputProjectContainer = ({addNewProjectProp}) => {
    return (  
        <div className='special-input-project-container'>
            <SpecialInputProject addNewProjectProp={addNewProjectProp}/>
            <button>+</button>
        </div>
    );
}
 
export default SpecialInputProjectContainer;