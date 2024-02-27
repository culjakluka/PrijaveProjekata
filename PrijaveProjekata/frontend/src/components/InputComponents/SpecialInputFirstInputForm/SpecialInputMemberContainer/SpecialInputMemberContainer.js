import React, { useState } from 'react';

import '../SpecialInput.css'
import SpecialInputMember from '../SpecialInputMember/SpecialInputMember';

const SpecialInputMemberContainer = ({addProjectMember}) => {


    return (
        <div className='special-input-member-container'>
            <SpecialInputMember addProjectMember={addProjectMember}/>
        </div>
    );
}
 
export default SpecialInputMemberContainer;