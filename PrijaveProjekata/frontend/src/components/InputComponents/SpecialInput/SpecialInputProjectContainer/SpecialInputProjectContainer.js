import react, { useState } from 'react'
import '../SpecialInput.css'
import SpecialInputProject from '../SpecialInputProject/SpecialInputProject';

const SpecialInputProjectContainer = ({addNewProjectProp}) => {
    return (  
        <div className='special-input-project-container'>
            <SpecialInputProject addNewProjectProp={addNewProjectProp}/>
        </div>
    );
}
 
export default SpecialInputProjectContainer;
